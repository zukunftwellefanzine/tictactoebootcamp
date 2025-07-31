// ============================================
// 1. SITEMAP DISEÑADO:
// - Página principal con tablero 3x3
// - Panel de estado del juego
// - Botón de reinicio
// ============================================

// ============================================
// 2. ESTRUCTURA DE COMPONENTES (WIREFRAME):
// - Tablero: 9 casillas en grid 3x3
// - Estado: Mensaje de turno/ganador
// - Controles: Botón de reinicio
// ============================================

console.log('🎮 Iniciando juego de Tic Tac Toe');

// ============================================
// 3. VARIABLES GLOBALES DEL JUEGO
// ============================================

let gameState = {
    board: Array(9).fill(null), // Tablero vacío
    currentPlayer: 'X',         // Jugador actual
    gameActive: true,           // Estado del juego
    winner: null,               // Ganador
    winningLine: []             // Línea ganadora
};

// Combinaciones ganadoras
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

// ============================================
// 4. ELEMENTOS DEL DOM
// ============================================

const squares = document.querySelectorAll('.square');
const statusMessage = document.getElementById('statusMessage');
const restartBtn = document.getElementById('restartBtn');
const gameStatusDiv = document.querySelector('.alert');

console.log('✅ Elementos del DOM cargados:', {
    squares: squares.length,
    statusMessage: !!statusMessage,
    restartBtn: !!restartBtn
});

// ============================================
// 5. LISTA DE INTERACCIONES/EVENTOS:
// - Usuario hace clic en una casilla
// - Sistema verifica si hay ganador
// - Sistema cambia de turno
// - Usuario hace clic en reiniciar
// - Sistema actualiza interfaz
// ============================================

// ============================================
// 6. FUNCIONES DE MANEJO DE EVENTOS
// ============================================

/**
 * Maneja el clic en una casilla del tablero
 * @param {Event} event - Evento de clic
 */
function handleSquareClick(event) {
    console.log('🖱️ Click en casilla detectado');
    
    const clickedSquare = event.target;
    const squareIndex = parseInt(clickedSquare.getAttribute('data-index'));
    
    console.log('📍 Índice de casilla clickeada:', squareIndex);
    console.log('🎯 Estado actual del tablero:', gameState.board);
    console.log('👤 Jugador actual:', gameState.currentPlayer);
    
    // Verificar si la casilla ya está ocupada o el juego terminó
    if (gameState.board[squareIndex] !== null || !gameState.gameActive) {
        console.log('❌ Movimiento inválido - Casilla ocupada o juego terminado');
        return;
    }
    
    // Realizar el movimiento
    makeMove(squareIndex, clickedSquare);
}

/**
 * Realiza un movimiento en el tablero
 * @param {number} index - Índice de la casilla
 * @param {HTMLElement} squareElement - Elemento DOM de la casilla
 */
function makeMove(index, squareElement) {
    console.log('🎯 Realizando movimiento en posición:', index);
    
    // Actualizar estado del juego
    gameState.board[index] = gameState.currentPlayer;
    
    // Actualizar interfaz
    squareElement.textContent = gameState.currentPlayer;
    squareElement.disabled = true;
    
    // Agregar clase CSS según el jugador
    if (gameState.currentPlayer === 'X') {
        squareElement.classList.add('x-player');
    } else {
        squareElement.classList.add('o-player');
    }
    
    console.log('✅ Movimiento realizado. Nuevo estado:', gameState.board);
    
    // Verificar si hay ganador
    checkForWinner();
    
    // Si el juego continúa, cambiar turno
    if (gameState.gameActive) {
        switchPlayer();
    }
}

/**
 * Verifica si hay un ganador o empate
 */
function checkForWinner() {
    console.log('🔍 Verificando ganador...');
    
    // Verificar cada combinación ganadora
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        
        if (gameState.board[a] && 
            gameState.board[a] === gameState.board[b] && 
            gameState.board[a] === gameState.board[c]) {
            
            console.log('🏆 ¡Ganador encontrado!', {
                winner: gameState.board[a],
                line: winningCombinations[i]
            });
            
            gameState.winner = gameState.board[a];
            gameState.winningLine = winningCombinations[i];
            gameState.gameActive = false;
            
            handleGameWin();
            return;
        }
    }
    
    // Verificar empate
    if (!gameState.board.includes(null)) {
        console.log('🤝 ¡Empate detectado!');
        gameState.gameActive = false;
        handleGameDraw();
        return;
    }
    
    console.log('⏳ Juego continúa...');
}

/**
 * Maneja cuando hay un ganador
 */
function handleGameWin() {
    console.log('🎉 Manejando victoria del jugador:', gameState.winner);
    
    // Actualizar mensaje de estado
    statusMessage.textContent = `🎉 ¡Jugador ${gameState.winner} ganó!`;
    gameStatusDiv.className = 'alert alert-success';
    
    // Resaltar casillas ganadoras
    gameState.winningLine.forEach(index => {
        squares[index].classList.add('winning');
    });
    
    // Deshabilitar todas las casillas
    squares.forEach(square => {
        square.disabled = true;
    });
}

/**
 * Maneja cuando hay empate
 */
function handleGameDraw() {
    console.log('🤝 Manejando empate');
    
    statusMessage.textContent = '🤝 ¡Es un empate!';
    gameStatusDiv.className = 'alert alert-warning';
}

/**
 * Cambia al siguiente jugador
 */
function switchPlayer() {
    console.log('🔄 Cambiando jugador...');
    
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    
    console.log('👤 Nuevo jugador actual:', gameState.currentPlayer);
    
    // Actualizar mensaje de estado
    statusMessage.textContent = `Turno del jugador: ${gameState.currentPlayer}`;
}

/**
 * Reinicia el juego
 */
function handleRestart() {
    console.log('🔄 Reiniciando juego...');
    
    // Resetear estado del juego
    gameState = {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        gameActive: true,
        winner: null,
        winningLine: []
    };
    
    // Resetear interfaz
    squares.forEach(square => {
        square.textContent = '';
        square.disabled = false;
        square.className = 'btn btn-outline-primary square';
    });
    
    // Resetear mensaje de estado
    statusMessage.textContent = 'Turno del jugador: X';
    gameStatusDiv.className = 'alert alert-info';
    
    console.log('✅ Juego reiniciado correctamente');
}

/**
 * Muestra el estado actual del juego en consola
 */
function logGameState() {
    console.log('📊 Estado actual del juego:', {
        board: gameState.board,
        currentPlayer: gameState.currentPlayer,
        gameActive: gameState.gameActive,
        winner: gameState.winner,
        winningLine: gameState.winningLine
    });
}

// ============================================
// 7. INICIALIZACIÓN Y EVENT LISTENERS
// ============================================

/**
 * Inicializa el juego
 */
function initGame() {
    console.log('🚀 Inicializando juego...');
    
    // Agregar event listeners a las casillas
    squares.forEach((square, index) => {
        square.addEventListener('click', handleSquareClick);
        console.log(`✅ Event listener agregado a casilla ${index}`);
    });
    
    // Agregar event listener al botón de reinicio
    restartBtn.addEventListener('click', handleRestart);
    console.log('✅ Event listener agregado al botón de reinicio');
    
    // Mostrar estado inicial
    logGameState();
    
    console.log('🎮 ¡Juego listo para jugar!');
}

// ============================================
// 8. FUNCIONES DE DEBUGGING
// ============================================

/**
 * Función para testing - simula un clic en una casilla
 * @param {number} index - Índice de la casilla
 */
function simulateClick(index) {
    console.log('🧪 Simulando clic en casilla:', index);
    const square = squares[index];
    square.click();
}

/**
 * Función para testing - muestra el estado completo
 */
function debugGame() {
    console.log('🐛 DEBUG - Estado completo del juego:');
    logGameState();
    console.log('🐛 DEBUG - Estado visual del tablero:');
    squares.forEach((square, index) => {
        console.log(`Casilla ${index}: "${square.textContent}" (disabled: ${square.disabled})`);
    });
}

// ============================================
// 9. INICIAR EL JUEGO CUANDO SE CARGA LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado completamente');
    initGame();
});

// ============================================
// 10. FUNCIONES GLOBALES PARA TESTING
// ============================================

// Hacer funciones disponibles globalmente para testing en consola
window.debugGame = debugGame;
window.simulateClick = simulateClick;
window.logGameState = logGameState;

console.log('🔧 Funciones de debug disponibles: debugGame(), simulateClick(index), logGameState()');