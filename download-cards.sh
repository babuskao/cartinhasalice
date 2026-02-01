#!/bin/bash

# Script para baixar imagens do baralho
# Fonte: https://github.com/hayeah/playing-cards-assets

CARDS_DIR="./cards"
REPO_URL="https://raw.githubusercontent.com/hayeah/playing-cards-assets/master/png"

# Criar diretório se não existir
mkdir -p "$CARDS_DIR"

# Array com todos os códigos das cartas (52 + verso)
CARDS=(
    "AS" "2S" "3S" "4S" "5S" "6S" "7S" "8S" "9S" "10S" "JS" "QS" "KS"
    "AH" "2H" "3H" "4H" "5H" "6H" "7H" "8H" "9H" "10H" "JH" "QH" "KH"
    "AD" "2D" "3D" "4D" "5D" "6D" "7D" "8D" "9D" "10D" "JD" "QD" "KD"
    "AC" "2C" "3C" "4C" "5C" "6C" "7C" "8C" "9C" "10C" "JC" "QC" "KC"
)

echo "🃏 Baixando imagens do baralho..."

for card in "${CARDS[@]}"; do
    filename="${CARDS_DIR}/${card}.png"
    url="${REPO_URL}/${card}.png"
    
    if [ ! -f "$filename" ]; then
        echo "Baixando $card..."
        curl -s -o "$filename" "$url"
    else
        echo "✓ $card já existe"
    fi
done

# Baixar verso
if [ ! -f "${CARDS_DIR}/back.png" ]; then
    echo "Baixando verso..."
    curl -s -o "${CARDS_DIR}/back.png" "${REPO_URL}/back.png"
else
    echo "✓ verso já existe"
fi

echo "✅ Baralho completo! Imagens em $CARDS_DIR/"
