// ========== Configuração do Jogo ==========
const CARD_VALUES = {
    'A': [1, 11],
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 10,
    'J': 10, 'Q': 10, 'K': 10
};

const SUITS = ['S', 'H', 'D', 'C'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];

// Estados do jogo
let gameState = {
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    gameOver: false,
    round: 1,
    playerWon: false
};

// Mensagens zoeiras
const comments = {
    start: [
        "🃏 Ai meu Deus, começou a bateção.",
        "Respira… o baralho não perdoa.",
        "Valendo orgulho e dignidade."
    ],
    playerWinning: [
        "AMOR?? TU VIU ISSO?? 😭🔥",
        "Segue firme que hoje é teu dia!",
        "O dealer sentiu."
    ],
    dealerWinning: [
        "Vish… o cara tá confiante demais.",
        "Calma, ainda dá pra virar.",
        "A soberba precede a derrota, viu."
    ],
    bust: [
        "IH… explodiu 😔",
        "Passou de 21, aí é emoção demais.",
        "Era pra parar, vida."
    ],
    blackjack: [
        "BLACKJACK?? MATOU A MUFA! 🔥",
        "Olha só essa... perfeição.",
        "Que combo! Que combo!"
    ],
    dealerBust: [
        "Dealer explodiu! Sorte sua! 🎉",
        "Quando o computador falha, tudo flui.",
        "Sem chance pro robot."
    ],
    tie: [
        "Empatou... próxima rodada.",
        "Tecnicamente, é um empate fofo.",
        "Ambos com 21. Respeito."
    ]
};

// ========== Inicialização ==========
function createDeck() {
    const deck = [];
    for (let suit of SUITS) {
        for (let rank of RANKS) {
            deck.push({ rank, suit, code: rank + suit });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
        const value = CARD_VALUES[card.rank];
        if (card.rank === 'A') {
            aces++;
            score += 11;
        } else if (typeof value === 'object') {
            score += value[0];
        } else {
            score += value;
        }
    }

    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }

    return score;
}

function renderCard(card) {
    const img = document.createElement('img');
    img.src = `cards/${card.code}.png`;
    img.alt = `${card.rank} of ${card.suit}`;
    img.classList.add('card');
    img.onerror = () => {
        img.style.display = 'none';
        renderCardFallback(card.code);
    };
    return img;
}

function renderCardFallback(code) {
    const fallback = document.createElement('div');
    fallback.style.cssText = `
        width: 80px;
        height: 110px;
        background: linear-gradient(135deg, #e63946 0%, #a4161a 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    `;
    fallback.textContent = code;
    return fallback;
}

function updateDisplay() {
    gameState.playerScore = calculateScore(gameState.playerHand);
    gameState.dealerScore = calculateScore(gameState.dealerHand);

    document.getElementById('player-score').textContent = gameState.playerScore;
    document.getElementById('dealer-score').textContent = gameState.dealerScore;

    const playerHandEl = document.getElementById('player-hand');
    const dealerHandEl = document.getElementById('dealer-hand');

    playerHandEl.innerHTML = '';
    dealerHandEl.innerHTML = '';

    gameState.playerHand.forEach(card => {
        playerHandEl.appendChild(renderCard(card));
    });

    gameState.dealerHand.forEach(card => {
        dealerHandEl.appendChild(renderCard(card));
    });
}

function say(type) {
    const messageEl = document.getElementById('message');
    const texts = comments[type] || comments.start;
    const text = texts[Math.floor(Math.random() * texts.length)];
    messageEl.textContent = text;
}

function startGame() {
    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    resetGame();
}

function resetGame() {
    document.getElementById('reward-modal').classList.remove('show');
    
    // Incrementar rodada se jogo foi completado
    const newRound = gameState.playerWon ? gameState.round + 1 : gameState.round;
    
    gameState = {
        deck: createDeck(),
        playerHand: [],
        dealerHand: [],
        playerScore: 0,
        dealerScore: 0,
        gameOver: false,
        round: newRound,
        playerWon: false
    };

    document.getElementById('round').textContent = gameState.round;
    
    // Resetar estado dos botões
    document.getElementById('btn-hit').disabled = false;
    document.getElementById('btn-stand').disabled = false;
    document.getElementById('btn-hit').style.opacity = '1';
    document.getElementById('btn-stand').style.opacity = '1';
    document.getElementById('btn-hit').style.display = 'inline-block';
    document.getElementById('btn-stand').style.display = 'inline-block';
    document.getElementById('btn-reset').style.display = 'none';

    // Distribuir cartas iniciais
    gameState.playerHand.push(gameState.deck.pop());
    gameState.dealerHand.push(gameState.deck.pop());
    gameState.playerHand.push(gameState.deck.pop());
    gameState.dealerHand.push(gameState.deck.pop());

    updateDisplay();
    say('start');

    // Verificar blackjack
    setTimeout(() => {
        if (calculateScore(gameState.playerHand) === 21) {
            say('blackjack');
        }
    }, 500);
}

function playerHit() {
    if (gameState.gameOver || gameState.deck.length === 0) return;

    gameState.playerHand.push(gameState.deck.pop());
    updateDisplay();

    if (gameState.playerScore > 21) {
        say('bust');
        endGame('bust');
    } else if (gameState.playerScore === 21) {
        say('playerWinning');
    } else {
        const messages = [
            "Pode ir comprando...",
            "Mais uma? Vai fundo!",
            "Tá na mão..."
        ];
        document.getElementById('message').textContent = messages[Math.floor(Math.random() * messages.length)];
    }
}

function playerStand() {
    if (gameState.gameOver) return;

    document.getElementById('btn-hit').disabled = true;
    document.getElementById('btn-stand').disabled = true;
    document.getElementById('btn-hit').style.opacity = '0.5';
    document.getElementById('btn-stand').style.opacity = '0.5';

    say('dealerWinning');
    
    setTimeout(() => {
        dealerPlay();
    }, 1500);
}

function dealerPlay() {
    // Dealer joga com delay para parecer mais realista
    function dealerTurn() {
        const dealerScore = calculateScore(gameState.dealerHand);
        if (dealerScore < 16) {
            gameState.dealerHand.push(gameState.deck.pop());
            updateDisplay();
            setTimeout(() => dealerTurn(), 1000);
        } else {
            determineWinner();
        }
    }
    dealerTurn();
}

function determineWinner() {
    const playerScore = calculateScore(gameState.playerHand);
    const dealerScore = calculateScore(gameState.dealerHand);

    if (dealerScore > 21) {
        say('dealerBust');
        gameState.playerWon = true;
        endGame();
        showReward();
    } else if (playerScore > dealerScore) {
        say('playerWinning');
        gameState.playerWon = true;
        endGame();
        showReward();
    } else if (playerScore < dealerScore) {
        say('dealerWinning');
        gameState.playerWon = false;
        endGame();
    } else {
        say('tie');
        gameState.playerWon = false;
        endGame();
    }
}

function endGame(type = null) {
    gameState.gameOver = true;

    document.getElementById('btn-hit').disabled = true;
    document.getElementById('btn-stand').disabled = true;
    document.getElementById('btn-hit').style.opacity = '0.5';
    document.getElementById('btn-stand').style.opacity = '0.5';
    document.getElementById('btn-reset').style.display = 'inline-block';

    if (type === 'bust') {
        gameState.playerWon = false;
    }
}

function showReward() {
    setTimeout(() => {
        triggerConfetti();
        document.getElementById('reward-modal').classList.add('show');
        gameState.round++;
    }, 1000);
}

function closeReward() {
    document.getElementById('reward-modal').classList.remove('show');
}

// ========== Confete ==========
function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 5 + 5,
            size: Math.random() * 8 + 3,
            rotation: Math.random() * Math.PI * 2,
            color: Math.random() > 0.5 ? '#e63946' : '#1a1a1a',
            opacity: 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let allFallen = true;

        confetti.forEach(piece => {
            if (piece.y < canvas.height) {
                allFallen = false;
                piece.y += piece.vy;
                piece.vy += 0.2;
                piece.x += piece.vx;
                piece.vx *= 0.99;
                piece.opacity -= 0.01;

                ctx.save();
                ctx.globalAlpha = piece.opacity;
                ctx.fillStyle = piece.color;
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation);
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
                ctx.restore();
            }
        });

        if (!allFallen) {
            requestAnimationFrame(animate);
        } else {
            canvas.style.display = 'none';
        }
    }

    canvas.style.display = 'block';
    animate();
}

// ========== Event Listeners ==========
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========== Iniciar ==========
document.addEventListener('DOMContentLoaded', () => {
    say('start');
});
