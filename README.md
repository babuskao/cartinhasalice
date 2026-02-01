# 🃏 Cartinhas da Alice

Um joguinho de cartas lindo, fofo e com muito amor. Blackjack simplificado com cartas reais, animações suaves e um texto especial como recompensa.

## 🎮 Como Jogar

1. Clique em **"Bora jogar? 💕"** na tela inicial
2. Compre cartas com o botão **"Comprar 🃏"** até ficar satisfeito
3. Clique em **"Parar ⏹️"** quando achar que está bom
4. O dealer joga automaticamente (regra: dealer compra até 16)
5. Quem chegar mais perto de 21 vence! 🎉

**Regras:**
- Valete, Dama e Rei = 10 pontos
- Ás = 1 ou 11 (automático)
- Passar de 21 = bust (você perde)
- Igualar a pontuação do dealer = empate

## 🎨 Features

✅ Cartas reais em PNG com animações lindas  
✅ Dealer "inteligente" (mas divertido)  
✅ Mensagens zoeiras que reagem ao jogo  
✅ Confete animado na vitória  
✅ Design vermelho e preto, fofinho  
✅ Texto carinhoso como recompensa ao ganhar  
✅ Totalmente responsivo (mobile, tablet, desktop)  
✅ Deploy ready para Netlify  

## 📁 Estrutura

```
cartinhasalice/
├── index.html          # HTML da aplicação
├── style.css           # Estilos (Inter, vermelho/preto, animações)
├── script.js           # Lógica do jogo
├── download-cards.sh   # Script para baixar imagens
├── netlify.toml        # Configuração de deploy
├── .gitignore          # Arquivos a ignorar
├── cards/              # Pasta com as 52 cartas + verso
│   ├── AS.png
│   ├── 2S.png
│   └── ... (52 cartas)
└── README.md           # Este arquivo
```

## 🚀 Deploy no Netlify

### Opção 1: Deploy automático (recomendado)

1. Faça push para o GitHub
2. Conecte o repo no Netlify (drag & drop ou integração)
3. Configure o build command: `bash download-cards.sh`
4. Netlify faz o resto automaticamente

### Opção 2: Deploy manual local

```bash
# Baixar imagens localmente
bash download-cards.sh

# Testar localmente (qualquer servidor HTTP)
python -m http.server 8000
# Acesse http://localhost:8000
```

## 💻 Desenvolvimento

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para baixar imagens na primeira vez)

### Estrutura do jogo

**HTML (index.html):**
- Tela de introdução com o texto de aniversário
- Área do jogo (dealer vs player)
- Modal de recompensa com o texto completo

**CSS (style.css):**
- Paleta: vermelho (#e63946) + preto (#1a1a1a)
- Fonte: Inter (Google Fonts)
- Animações: pop de cartas, confete, transições suaves
- Layout responsivo com Flexbox

**JavaScript (script.js):**
- Embaralhador de 52 cartas
- Engine de cálculo de pontuação (com Ás flexível)
- IA simples do dealer (hit < 16)
- Sistema de mensagens zoeiras
- Renderização de cartas com fallback
- Confete animado

## 🃏 Imagens das Cartas

As imagens vêm de um repositório público (Deck of Cards - GitHub):
- **Códigos padrão**: AS (Ás de Paus), KH (Rei de Copas), 5D (5 de Ouros), etc.
- **Verso**: back.png
- **Qualidade**: PNG 140x190px, perfeito para web

Se as imagens não carregarem na primeira vez, o jogo exibe um fallback bonito em gradiente.

## 🎯 Customizações

### Mudar mensagens
Edite o objeto `comments` em `script.js`:
```javascript
const comments = {
    start: ["sua mensagem aqui"],
    playerWinning: ["..."],
    // etc
};
```

### Mudar cores
Edite as variáveis CSS em `style.css`:
```css
:root {
    --primary: #e63946;    /* Vermelho */
    --dark: #1a1a1a;       /* Preto */
    --accent: #a4161a;     /* Vermelho escuro */
}
```

### Mudar texto de recompensa
Edite o HTML dentro de `.reward-message` em `index.html`

## 📱 Responsividade

- **Desktop**: 1000px max-width, cartas grandes
- **Tablet**: ajuste automático, layout fluido
- **Mobile**: cards compactos, botões touchable

## 🎬 Animações

- **Pop de cartas**: escala 0 → 1.1 → 1, rotação suave
- **Fade de mensagens**: desliza para cima com fade in
- **Confete**: partículas caem com gravidade simulada
- **Transições**: 0.3s ease em todos os estados

## 🔐 Sem dependências externas

Tudo é vanilla JS + CSS. Nada de React, Vue ou bibliotecas pesadas. Deploy superfacil.

## 📄 Licença

Imagens das cartas: [Deck of Cards - GitHub](https://github.com/hayeah/playing-cards-assets)  
Resto: criado com ❤️

---

**Feito com muito amor pra você. Feliz aniversário! 🎂✨**