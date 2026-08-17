/* ==========================================================================
   Tatry Marketing — skrypt interfejsu
   --------------------------------------------------------------------------
   Zasada: strona ma być w pełni czytelna i nawigowalna bez JavaScriptu.
   Ten plik dokłada wyłącznie wygodę (menu mobilne, rozwijane podmenu,
   walidacja formularza), nigdy treść — dzięki temu robot Google widzi
   dokładnie to samo co użytkownik.

   Ładowany z atrybutem `defer`, więc nie blokuje renderowania.
   ========================================================================== */
(function () {
  'use strict';

  var mq = window.matchMedia('(max-width: 960px)');

  /* ----------------------------------------------------------------------
     Menu mobilne
     ---------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var burger = document.querySelector('.burger');

  function setNav(open) {
    if (!header || !burger) return;
    header.setAttribute('data-nav-open', open ? 'true' : 'false');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    // Blokada przewijania tła tylko wtedy, gdy menu faktycznie je przykrywa
    document.body.style.overflow = open && mq.matches ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });
  }

  /* ----------------------------------------------------------------------
     Podmenu „Usługi”
     Desktop: otwiera się najechaniem i fokusem klawiatury.
     Mobile:  otwiera się kliknięciem w przycisk.
     ---------------------------------------------------------------------- */
  var dropdowns = Array.prototype.slice.call(document.querySelectorAll('.nav__item--has-panel'));

  function closeAllPanels(except) {
    dropdowns.forEach(function (item) {
      if (item === except) return;
      item.setAttribute('data-open', 'false');
      var btn = item.querySelector('.nav__toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(function (item) {
    var btn = item.querySelector('.nav__toggle');
    if (!btn) return;

    function toggle(open) {
      item.setAttribute('data-open', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeAllPanels(item);
      toggle(open);
    });

    // Na desktopie kursor wystarczy, żeby otworzyć podmenu
    item.addEventListener('mouseenter', function () {
      if (!mq.matches) toggle(true);
    });
    item.addEventListener('mouseleave', function () {
      if (!mq.matches) toggle(false);
    });

    // Wyjście fokusu poza podmenu je zamyka (obsługa klawiatury)
    item.addEventListener('focusout', function (e) {
      if (!mq.matches && !item.contains(e.relatedTarget)) toggle(false);
    });
  });

  // Escape zamyka wszystko i przywraca fokus na przycisk menu
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAllPanels(null);
    if (header && header.getAttribute('data-nav-open') === 'true') {
      setNav(false);
      if (burger) burger.focus();
    }
  });

  // Kliknięcie poza nagłówkiem zamyka podmenu
  document.addEventListener('click', function (e) {
    if (header && !header.contains(e.target)) closeAllPanels(null);
  });

  // Zmiana breakpointu resetuje stan, żeby menu nie zostało „w połowie”
  mq.addEventListener('change', function () {
    setNav(false);
    closeAllPanels(null);
  });

  /* ----------------------------------------------------------------------
     Cień nagłówka po przewinięciu
     ---------------------------------------------------------------------- */
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('is-stuck', window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------------------
     Formularz kontaktowy
     Walidacja HTML5 wystarcza; tutaj tylko czytelniejsze komunikaty
     i zabezpieczenie honeypot przed botami.
     ---------------------------------------------------------------------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');

    form.addEventListener('submit', function (e) {
      // Pole-pułapka: człowiek go nie widzi, więc wypełnia je tylko bot
      var trap = form.querySelector('[name="_firma_www"]');
      if (trap && trap.value !== '') {
        e.preventDefault();
        return;
      }

      if (!form.checkValidity()) {
        e.preventDefault();
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          if (status) {
            status.textContent = 'Uzupełnij zaznaczone pola — bez nich nie odbierzemy zgłoszenia.';
            status.hidden = false;
          }
        }
      }
    });

    // Komunikat znika, gdy tylko użytkownik zacznie poprawiać dane
    form.addEventListener('input', function () {
      if (status && !status.hidden && form.checkValidity()) status.hidden = true;
    });
  }

  /* ----------------------------------------------------------------------
     Tło wideo w sekcji hero
     ----------------------------------------------------------------------
     Plik wideo NIE jest zadeklarowany w HTML — adresy siedzą w atrybutach
     `data-`. Gdyby stały w <source>, przeglądarka zaczęłaby pobierać
     nagranie natychmiast: także na telefonie w roamingu i u osoby, która
     w systemie wyłączyła animacje. Tutaj pobranie następuje dopiero po
     sprawdzeniu warunków, a do tego czasu (i zawsze, gdy warunki nie są
     spełnione) widoczny jest plakat.

     Efekt: wideo nie wchodzi na ścieżkę krytyczną i nie psuje LCP.
     ---------------------------------------------------------------------- */
  var heroVideo = document.querySelector('[data-hero-video]');

  if (heroVideo) {
    var shouldLoadVideo = function () {
      // 1. Użytkownik prosił system o ograniczenie animacji — uszanuj to.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

      // 2. Wąski ekran — koszt transferu przewyższa efekt wizualny.
      var minW = parseInt(heroVideo.getAttribute('data-min-width'), 10) || 768;
      if (window.innerWidth < minW) return false;

      // 3. Wolne łącze albo włączony tryb oszczędzania danych.
      var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        if (conn.saveData) return false;
        if (/(^|-)2g$/.test(conn.effectiveType || '')) return false;
      }

      return true;
    };

    var startHeroVideo = function () {
      if (heroVideo.dataset.loaded === 'true') return;
      heroVideo.dataset.loaded = 'true';

      // Kolejność ma znaczenie: WebM przed MP4, bo przy tej samej jakości
      // waży wyraźnie mniej. Safari pominie go i weźmie MP4.
      [
        ['data-webm', 'video/webm'],
        ['data-mp4', 'video/mp4']
      ].forEach(function (pair) {
        var src = heroVideo.getAttribute(pair[0]);
        if (!src) return;
        var source = document.createElement('source');
        source.src = src;
        source.type = pair[1];
        heroVideo.appendChild(source);
      });

      heroVideo.load();

      // Pokaż dopiero, gdy leci obraz — inaczej mignęłaby czarna klatka.
      // Klasa na kontenerze włącza też przyciemnienie: bez odtwarzanego
      // nagrania nie ma czego przyciemniać, a plakat ma zostać czysty.
      heroVideo.addEventListener('playing', function () {
        heroVideo.classList.add('is-playing');
        if (heroVideo.parentElement) heroVideo.parentElement.classList.add('is-playing');
      });

      // Autoodtwarzanie bywa blokowane mimo `muted`. Odrzucona obietnica
      // nie jest błędem — po prostu zostaje plakat.
      var attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(function () {
          heroVideo.classList.remove('is-playing');
        });
      }
    };

    if (shouldLoadVideo()) {
      /* Nagranie startuje dopiero po wczytaniu reszty strony, żeby nie
         konkurowało o pasmo z fontami i arkuszem stylów. */
      if (document.readyState === 'complete') startHeroVideo();
      else window.addEventListener('load', startHeroVideo);

      /* Poza ekranem odtwarzanie jest marnowaniem baterii i procesora.
         Przy przewinięciu poniżej sekcji hero film się zatrzymuje. */
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (heroVideo.dataset.loaded !== 'true') return;
              if (entry.isIntersecting) {
                var p = heroVideo.play();
                if (p && typeof p.catch === 'function') p.catch(function () {});
              } else {
                heroVideo.pause();
              }
            });
          },
          { threshold: 0.1 }
        ).observe(heroVideo);
      }
    }
  }

  /* ----------------------------------------------------------------------
     Rok w stopce — jedno miejsce mniej do ręcznej aktualizacji
     ---------------------------------------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
