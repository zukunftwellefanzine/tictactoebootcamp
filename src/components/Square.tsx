import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinning?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning = false }) => {
  // Console.log para verificar que el evento se está llamando
  const handleClick = () => {
    console.log('Square clicked:', value);
    onClick();
  };

  return (
    <button
      className={`btn square ${isWinning ? 'btn-success' : 'btn-outline-primary'}`}
      onClick={handleClick}
      disabled={value !== null}
      style={{
        width: '100px',
        height: '100px',
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '2px',
        transition: 'all 0.3s ease',
      }}
    >
      {value}
    </button>
  );
};

export default Square;