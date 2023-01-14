import { SquareColor } from '@/types';
import gameBoard from '../../../game-board.json';
import Square from './Square';

export function GameBoard() {
  return (
    <section className="w-3/4 max-w-5xl grid grid-cols-15 grid-rows-7 gap-1">
      {gameBoard.flat().map(({ color, center, star }, index) => (
        <Square
          color={color as SquareColor}
          center={center}
          star={!!star}
          key={index}
        />
      ))}
    </section>
  );
}
