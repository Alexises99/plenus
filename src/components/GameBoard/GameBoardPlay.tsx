'use client'

import { GameSquare } from '@/dtos/square'
import { useAction } from '@/hooks/useAction'
import { DiceData } from '@/hooks/usePairDices'
import { SquareColor } from '@/types'
import { toLetters } from '@/utils/populate'
import { useMemo } from 'react'
import DecorationSquare from './DecorationSquare'
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

  const topLetters = useMemo(() => Array.from(Array(15).keys()), [])
  const points = [5, 3, 3, 3, 2, 2, 2]
  const reducedPoints = [3, 2, 2, 2, 1, 1, 1]
  const principalPoints = [...points, 1, ...points.reverse()]
  const secundaryPoints = [...reducedPoints, 0, ...reducedPoints.reverse()]

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full grid grid-cols-15 gap-1 mb-2 md:w-full md:max-w-lg lg:w-3/4 lg:max-w-5xl lg:mb-4">
        {topLetters.map((elem, index) => (
          <DecorationSquare middle={index === 7} key={index}>
            {toLetters(elem + 1)}
          </DecorationSquare>
        ))}
      </div>
      <section className="w-full grid grid-cols-15 grid-rows-7 md:w-full md:max-w-lg lg:w-3/4 lg:max-w-5xl gap-1">
        {gameBoard.map((square, index) => (
          <Square
            key={index}
            square={square}
            handleReveal={handleSquareReveal}
          />
        ))}
      </section>
      <div className="w-full  grid grid-cols-15 gap-1 mt-2 md:w-full md:max-w-lg lg:w-3/4 lg:max-w-5xl lg:mt-4">
        {principalPoints.map((elem, index) => (
          <DecorationSquare middle={index === 7} key={index}>
            {elem}
          </DecorationSquare>
        ))}
      </div>
      <div className="w-full  grid grid-cols-15 gap-1 mt-1 md:w-full md:max-w-lg lg:w-3/4 lg:max-w-5xl lg:mt-2">
        {secundaryPoints.map((elem, index) => (
          <DecorationSquare middle={index === 7} key={index}>
            {elem}
          </DecorationSquare>
        ))}
      </div>
    </div>
  )
}

export default GameBoardPlay
