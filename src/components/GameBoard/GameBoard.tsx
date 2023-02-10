'use client'

import { GameSquare } from '@/dtos/square'
import { useDices } from '@/hooks/useDices'
import { SquareColor } from '@/types'
import DicesContainer from '../Dices/DicesContainer'
import GameBoardPlay from './GameBoardPlay'

interface GameBoardPlayProps {
  gameBoard: GameSquare[]
  gameBoardGroup: Record<SquareColor, Array<Array<number>>>
}

export default function GameBoard({
  gameBoard,
  gameBoardGroup
}: GameBoardPlayProps) {
  const {
    dices,
    handleRestMovements,
    handleSelectedDice,
    restMovements,
    selectedDice,
    activeDice,
    rollDices
  } = useDices()

  return (
    <>
      <DicesContainer
        activeDice={activeDice}
        dices={dices}
        handleSelectedDice={handleSelectedDice}
        restMovements={restMovements}
        rollDices={rollDices}
      />

      <GameBoardPlay
        dice={selectedDice}
        gameBoardGroup={gameBoardGroup}
        initialGameBoard={gameBoard}
        handleRestMovements={handleRestMovements}
        restMovements={restMovements}
      />
    </>
  )
}
