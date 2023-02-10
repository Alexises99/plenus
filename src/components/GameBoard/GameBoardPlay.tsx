'use client'

import { GameSquare } from '@/dtos/square'
import { useAction } from '@/hooks/useAction'
import { DiceData } from '@/hooks/usePairDices'
import { SquareColor } from '@/types'
import Square from './Square'

interface GameBoardPlayProps {
  initialGameBoard: GameSquare[]
  gameBoardGroup: Record<SquareColor, Array<Array<number>>>
  dice: DiceData | null
  restMovements: number
  handleRestMovements: (restMovements: number) => void
}

function GameBoardPlay({
  gameBoardGroup,
  initialGameBoard,
  dice,
  handleRestMovements,
  restMovements
}: GameBoardPlayProps) {
  const { gameBoard, handleSquareReveal } = useAction({
    initialGameBoard,
    gameBoardGroup,
    dice,
    handleRestMovements,
    restMovements
  })
  return (
    <div className="flex flex-auto h-full items-center justify-center">
      <section className="w-3/4 max-w-5xl grid grid-cols-15 grid-rows-7 gap-1">
        {gameBoard.map((square, index) => (
          <Square
            key={index}
            square={square}
            handleReveal={handleSquareReveal}
          />
        ))}
      </section>
    </div>
  )
}

export default GameBoardPlay
