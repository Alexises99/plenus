'use client';

import { useSquare } from '@/hooks/useSquare';
import { SquareColor } from '@/types';
import { getSquareColor } from '@/utils/colors';

interface SquareProps {
  color: SquareColor;
  star?: boolean;
  center?: boolean;
}

export default function Square({
  color,
  star = false,
  center = false
}: SquareProps) {
  const { handleDiscover, selected } = useSquare();

  console.log(selected);

  return (
    <div
      className={`relative aspect-square rounded-md cursor-pointer ${getSquareColor(
        color
      )} ${center ? 'border-4 border-indigo-100' : ''}`}
      onClick={handleDiscover}
    >
      {star && (
        <img
          src="icons/star-square.svg"
          className="absolute w-full h-full p-2"
          alt="star"
        />
      )}
      {selected && (
        <img
          src="icons/cross-square.svg"
          className="absolute w-full h-full"
          alt="cross"
        />
      )}
    </div>
  );
}
