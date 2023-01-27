'use client'

import { GameSquare } from '@/dtos/square'
import { getSquareColor } from '@/utils/colors'

interface SquareProps {
  square: GameSquare
  handleReveal: (square: GameSquare) => void
}

export default function Square({ square, handleReveal }: SquareProps) {
  const { center, color, star, reveal, border } = square

  return (
    <div
      className={`relative aspect-square rounded-md cursor-pointer ${getSquareColor(
        color
      )} ${center ? 'border-4 border-indigo-100' : ''}
      ${border ? 'border-4 border-indigo-600 shadow-xl animate-pulse' : ''}`}
      onClick={() => {
        handleReveal(square)
      }}
    >
      {star && (
        <img
          src="icons/star-square.svg"
          className="absolute w-full h-full p-2"
          alt="star"
        />
      )}
      {reveal && (
        <img
          src="icons/cross-square.svg"
          className="absolute w-full h-full"
          alt="cross"
        />
      )}
    </div>
  )
}
