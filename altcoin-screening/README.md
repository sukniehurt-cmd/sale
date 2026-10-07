# Screening altcoinów – narzędzia

Katalog zawiera zestaw narzędzi do codziennego screeningu altcoinów (realny produkt, wiarygodny zespół,
partnerstwa, niska/zerowa inflacja tokena). Instalacja: `./scripts/setup.sh` (klony trafiają do `vendor/`,
środowisko do `.venv/` – oba w `.gitignore`). Raporty: `reports/RRRR-MM-DD-screen.md`.

## Status instalacji (2026-10-07)

| Narzędzie | Status | Do czego służy |
|---|---|---|
| [DefiLlama/defillama-skills](https://github.com/DefiLlama/defillama-skills) | sklonowane | gotowe skille/instrukcje dla agentów do zapytań o dane DefiLlama |
| [DefiLlama/dimension-adapters](https://github.com/DefiLlama/dimension-adapters) | sklonowane | adaptery opłat/przychodów/wolumenów protokołów – źródło definicji „revenue" |
| [DefiLlama/DefiLlama-Adapters](https://github.com/DefiLlama/DefiLlama-Adapters) | sklonowane | adaptery TVL |
| [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | sklonowane + `pip install openbb` (5.0.0) | platforma danych (ceny, fundamenty, krypto) przez Python/CLI |
| [docs.openbb.co](https://docs.openbb.co) | referencja | dokumentacja OpenBB |
| `useopentrade` ([PyPI](https://pypi.org/project/useopentrade/)) | zainstalowane z PyPI (0.1.3) | badania krypto, paczki agentów |
| [lequangphu/crypto-screener](https://github.com/lequangphu/crypto-screener) | sklonowane | skrypty screenera krypto |
| [nirholas/crypto-data-aggregator](https://github.com/nirholas/crypto-data-aggregator) | sklonowane | agregator danych krypto |
| [DefiLlama/emissions-adapters](https://github.com/DefiLlama/emissions-adapters) | **NIE zainstalowane** | harmonogramy emisji/unlocków tokenów – brak dostępu (klon odrzucony, `add_repo` też) |
| [UseOpenTrade/opentrade](https://github.com/UseOpenTrade/opentrade) | **NIE zainstalowane** | repo źródłowe; paczka PyPI `useopentrade` jest zainstalowana |
| defillama.com/mcp | **niedostępne** | serwer MCP DefiLlama – domena zablokowana przez politykę sieci środowiska |

## Ograniczenia środowiska

Polityka sieci tej sesji blokuje `defillama.com`, `api.llama.fi`, `coins.llama.fi`, CoinGecko i CoinPaprika,
więc narzędzia nie mogą tu pobierać danych na żywo. Pierwszy raport powstał więc z wyszukiwania internetowego
(źródła przy każdej tezie). Aby narzędzia działały w pełni, trzeba dodać te domeny do dozwolonych hostów
w ustawieniach środowiska (sieć), a emissions-adapters/opentrade udostępnić repozytorium lub poprawić nazwę.

## Jak używać

- Dane o przychodach/opłatach: DefiLlama (dimension-adapters, MCP) → kolumna „revenue" i „holders revenue".
- Inflacja/unlocki: emissions-adapters oraz tokenomist.ai; weryfikować max supply vs circulating.
- Ceny i fundamenty: `from openbb import obb` (po `. .venv/bin/activate`).
- Metodologia screeningu i kryteria: patrz nagłówek każdego raportu w `reports/`.
