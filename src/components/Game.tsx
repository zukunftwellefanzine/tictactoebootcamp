import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';

const Game: React.FC = () => {
  // Estado del juego
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);

  console.log('Game component rendered');

  // Función para calcular el ganador
  const calculateWinner = (squares: (string | null)[]) => {
    console.log('Calculating winner for squares:', squares);
    
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
      [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log('Winner found:', squares[a], 'Winning line:', lines[i]);
        return { winner: squares[a], line: lines[i] };
      }
    }
    
    console.log('No winner found');
    return { winner: null, line: [] };
  };

  // Función para manejar click en casilla
  const handleSquareClick = (index: number) => {
    console.log('handleSquareClick called for index:', index);
    
    if (squares[index] || winner) {
      console.log('Click ignored - square occupied or game finished');
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    
    console.log('New squares after move:', newSquares);
    console.log('Next player will be:', !isXNext ? 'X' : 'O');
    
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  // Función para reiniciar el juego
  const handleRestart = () => {
    console.log('handleRestart called - Resetting game');
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
  };

  // Efecto para verificar ganador después de cada movimiento
  useEffect(() => {
    console.log('useEffect triggered - checking for winner');
    const result = calculateWinner(squares);
    setWinner(result.winner);
    setWinningSquares(result.line);
  }, [squares]);

  // Verificar si es empate
  const isDraw = !winner && squares.every(square => square !== null);
  
  console.log('Current game state:', {
    squares,
    isXNext,
    winner,
    isDraw,
    winningSquares
  });

  return (
    <div className="game">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center mb-4" style={{ 
              background: 'linear-gradient(45deg, #007bff, #28a745)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '3rem',
              fontWeight: 'bold'
            }}>
              🎮 Tic Tac Toe
            </h1>
            
            <GameStatus
              winner={winner}
              currentPlayer={isXNext ? 'X' : 'O'}
              isDraw={isDraw}
              onRestart={handleRestart}
            />
            
            <Board
              squares={squares}
              onClick={handleSquareClick}
              winningSquares={winningSquares}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;