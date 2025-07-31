import React from 'react';

interface GameStatusProps {
  winner: string | null;
  currentPlayer: string;
  isDraw: boolean;
  onRestart: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, currentPlayer, isDraw, onRestart }) => {
  console.log('GameStatus rendered - Winner:', winner, 'Current Player:', currentPlayer, 'Draw:', isDraw);

  const handleRestart = () => {
    console.log('Restart button clicked');
    onRestart();
  };

  let statusMessage;
  let statusClass = 'alert-info';

  if (winner) {
    statusMessage = `🎉 ¡Jugador ${winner} ganó!`;
    statusClass = 'alert-success';
  } else if (isDraw) {
    statusMessage = '🤝 ¡Es un empate!';
    statusClass = 'alert-warning';
  } else {
    statusMessage = `Turno del jugador: ${currentPlayer}`;
  }

  return (
    <div className="game-status text-center mb-4">
      <div className={`alert ${statusClass}`} role="alert">
        <h4 className="mb-3">{statusMessage}</h4>
      </div>
      
      <button 
        className="btn btn-primary btn-lg"
        onClick={handleRestart}
        style={{
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        🔄 Nuevo Juego
      </button>
    </div>
  );
};

export default GameStatus;