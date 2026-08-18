<?php
/**
 * Obsługa formularza wyceny — Pralnia AF.
 *
 * Plik działa na każdym hostingu z PHP 7.4+ i włączoną funkcją mail()
 * (praktycznie każdy hosting współdzielony w Polsce). Nie wymaga bazy danych
 * ani żadnych bibliotek zewnętrznych.
 *
 * ────────────────────────────────────────────────────────────────
 *  DO USTAWIENIA PRZED PUBLIKACJĄ — trzy wartości poniżej.
 * ────────────────────────────────────────────────────────────────
 */

/** Adres, na który mają przychodzić zgłoszenia. */
const ODBIORCA = 'kontakt@pralnia-af.pl';

/**
 * Adres nadawcy. MUSI należeć do tej samej domeny co strona, inaczej
 * poczta trafi do spamu albo serwer odmówi wysyłki.
 */
const NADAWCA = 'formularz@pralnia-af.pl';

/** Domena strony — używana w nagłówkach wiadomości. */
const DOMENA = 'pralnia-af.pl';

// ────────────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/** Zwraca odpowiedź w formacie JSON i kończy działanie skryptu. */
function odpowiedz(int $kod, array $dane): void {
    http_response_code($kod);
    echo json_encode($dane, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    odpowiedz(405, ['ok' => false, 'error' => 'Nieobsługiwana metoda żądania.']);
}

/** Pobiera pole z formularza: przycina białe znaki i ogranicza długość. */
function pole(string $nazwa, int $limit = 500): string {
    $wartosc = $_POST[$nazwa] ?? '';
    if (!is_string($wartosc)) {
        return '';
    }
    return mb_substr(trim($wartosc), 0, $limit);
}

// 1. Pułapka na roboty — człowiek nigdy nie wypełni ukrytego pola.
if (pole('firma') !== '') {
    odpowiedz(200, ['ok' => true]);
}

// 2. Ograniczenie częstotliwości: jedno zgłoszenie na 30 sekund z adresu IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'nieznane';
$znacznik = sys_get_temp_dir() . '/af-form-' . md5($ip);
if (is_file($znacznik) && (time() - filemtime($znacznik)) < 30) {
    odpowiedz(429, [
        'ok' => false,
        'error' => 'Zgłoszenie zostało już wysłane. Odczekaj chwilę przed kolejną próbą.',
    ]);
}

// 3. Walidacja pól.
$imie      = pole('imie', 80);
$telefon   = pole('telefon', 20);
$email     = pole('email', 120);
$usluga    = pole('usluga', 120);
$wiadomosc = pole('wiadomosc', 2000);
$zgoda     = pole('zgoda', 10);

$bledy = [];

if (mb_strlen($imie) < 2) {
    $bledy[] = 'Podaj imię.';
}
if (strlen(preg_replace('/\D/', '', $telefon)) < 9) {
    $bledy[] = 'Podaj numer telefonu (co najmniej 9 cyfr).';
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $bledy[] = 'Adres e-mail wygląda na niepoprawny.';
}
if ($zgoda === '') {
    $bledy[] = 'Wymagana jest zgoda na kontakt.';
}

if ($bledy) {
    odpowiedz(422, ['ok' => false, 'error' => implode(' ', $bledy)]);
}

// 4. Złożenie wiadomości. Znaki nowej linii w danych od użytkownika nie mogą
//    trafić do nagłówków — inaczej formularz staje się bramką spamerską.
$czysty = static fn (string $v): string => str_replace(["\r", "\n"], ' ', $v);

$tresc = "Nowe zgłoszenie ze strony " . DOMENA . "\n\n"
    . "Imię:      {$imie}\n"
    . "Telefon:   {$telefon}\n"
    . "E-mail:    " . ($email !== '' ? $email : '—') . "\n"
    . "Usługa:    " . ($usluga !== '' ? $usluga : '—') . "\n"
    . "Data:      " . date('Y-m-d H:i') . "\n"
    . "Adres IP:  {$ip}\n\n"
    . "Szczegóły:\n"
    . ($wiadomosc !== '' ? $wiadomosc : '(brak dodatkowego opisu)') . "\n";

$temat = '=?UTF-8?B?' . base64_encode('Wycena ze strony: ' . $czysty($imie) . ' — ' . $czysty($telefon)) . '?=';

$naglowki = [
    'From: =?UTF-8?B?' . base64_encode('Formularz ' . DOMENA) . '?= <' . NADAWCA . '>',
    'Reply-To: ' . ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) ? $czysty($email) : NADAWCA),
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
];

$wyslano = @mail(ODBIORCA, $temat, $tresc, implode("\r\n", $naglowki), '-f' . NADAWCA);

// Licznik ograniczenia przesuwamy dopiero po udanej wysyłce — dzięki temu
// literówka w numerze telefonu nie blokuje poprawki na pół minuty.
if ($wyslano) {
    @touch($znacznik);
}

if (!$wyslano) {
    odpowiedz(500, [
        'ok' => false,
        'error' => 'Serwer poczty odrzucił wiadomość. Zadzwoń: 536 212 505.',
    ]);
}

odpowiedz(200, ['ok' => true]);
