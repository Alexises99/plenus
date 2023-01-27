'use client'

import { GameSquare, SquareId } from '@/dtos/square'
import { useAction } from '@/hooks/useAction'
import { SquareColor } from '@/types'
import { getSquareColor } from '@/utils/colors'
import Dice from './Dice'
import Square from './Square'

interface GameBoardPlayProps {
  gameBoard: GameSquare[]
  gameBoardGroup: Record<SquareColor, Array<Array<number>>>
}

export default function GameBoardPlay({
  gameBoard,
  gameBoardGroup
}: GameBoardPlayProps) {
  const {
    diceColor,
    diceNumber,
    rollDice,
    activeDice,
    restMovements,
    gameBoard: gameBoardState,
    handleSquareReveal
  } = useAction({ initialGameBoard: gameBoard, gameBoardGroup })
  return (
    <>
      <section className="flex justify-end pr-20 pt-10">
        <div className="flex flex-col items-center gap-3 border-2 p-4 border-blue-700">
          <div className="flex justify-center gap-8">
            <Dice active={activeDice}>{diceNumber}</Dice>
            <Dice active={activeDice}>
              <div
                className={`w-8 h-8 rounded-full ${getSquareColor(diceColor)}`}
              ></div>
            </Dice>
          </div>

          <span className="text-white text-lg">
            Movimientos restantes:{' '}
            <span className="font-semibold">{restMovements}</span>
          </span>
          <button
            className={`w-full ${
              activeDice ? 'bg-green-300' : 'bg-red-300'
            } rounded-full py-3`}
            onClick={rollDice}
          >
            Tirar
          </button>
        </div>
      </section>

      <div className="flex flex-auto h-full items-center justify-center">
        <section className="w-3/4 max-w-5xl grid grid-cols-15 grid-rows-7 gap-1">
          {gameBoardState.map((square, index) => (
            <Square
              key={index}
              square={square}
              handleReveal={handleSquareReveal}
            />
          ))}
        </section>
      </div>
    </>
  )
}
