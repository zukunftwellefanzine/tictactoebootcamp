import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
  winningSquares: number[];
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningSquares }) => {
  console.log('Board rendered with squares:', squares);

  const renderSquare = (index: number) => {
    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => {
          console.log('Board square clicked:', index);
          onClick(index);
        }}
        isWinning={winningSquares.includes(index)}
      />
    );
  };

  return (
    <div className="board">
      <div className="d-flex justify-content-center mb-2">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="d-flex justify-content-center mb-2">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="d-flex justify-content-center mb-2">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;