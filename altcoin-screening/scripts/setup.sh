#!/usr/bin/env bash
# Instalacja narzędzi do screeningu altcoinów. Uruchom z katalogu altcoin-screening/.
set -u
mkdir -p vendor
for r in DefiLlama/defillama-skills DefiLlama/dimension-adapters DefiLlama/DefiLlama-Adapters \
         OpenBB-finance/OpenBB lequangphu/crypto-screener nirholas/crypto-data-aggregator \
         DefiLlama/emissions-adapters UseOpenTrade/opentrade; do
  n=$(basename "$r")
  [ -d "vendor/$n" ] || git clone --depth 1 -q "https://github.com/$r" "vendor/$n" || echo "POMINIĘTO: $r"
done
python3 -m venv .venv
. .venv/bin/activate
pip install -q useopentrade openbb
