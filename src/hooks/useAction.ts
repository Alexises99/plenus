import { GameSquare } from '@/dtos/square'
import { SquareColor } from '@/types'
import { checkDice } from '@/utils/dice'
import { highlightGameBoard } from '@/utils/gameLogic'
import { useEffect, useRef, useState } from 'react'
import { DiceData } from './usePairDices'

interface useActionParams {
  initialGameBoard: GameSquare[]
  gameBoardGroup: Record<SquareColor, Array<Array<number>>>
  dice: DiceData | null
  restMovements: number
  handleRestMovements: (restMovements: number) => void
}

let lastSquareVisited: GameSquare | null = null

export function useAction({
  initialGameBoard,
  gameBoardGroup,
  dice,
  restMovements,
  handleRestMovements
}: useActionParams) {
  const [gameBoard, setGameBoard] = useState<GameSquare[]>(initialGameBoard)
  const firstTurn = useRef<boolean>(true)

  useEffect(() => {
    dice && checkGame(dice)
  }, [dice])

  const checkGame = (dice: DiceData) => {
    if (!checkDice(restMovements)) {
      return
    }
    highLightGame(dice)
  }

  const highLightGame = ({ diceColor, diceNumber }: DiceData) => {
    const highlightedGameBoard = highlightGameBoard(
      null,
      gameBoardGroup,
      gameBoard,
      diceNumber,
      diceColor,
      firstTurn.current,
      diceNumber
    )
    lastSquareVisited = null

    if (!highlightedGameBoard.some((square) => square.border)) {
      handleRestMovements(0)
    }
    setGameBoard(highlightedGameBoard)
  }

  const handleSquareReveal = (square: GameSquare) => {
    if (!square.border || restMovements < 1) return
    const prevRestMovements = restMovements
    handleRestMovements(prevRestMovements - 1)
    firstTurn.current = false
    lastSquareVisited = square

    const copyGameBoard = gameBoard.map((squareItem) => ({
      ...squareItem,
      reveal: squareItem.reveal ? true : squareItem.id === square.id
    }))
    if (dice) {
      const { diceColor, diceNumber } = dice
      const highlightedGameBoard = highlightGameBoard(
        square,
        gameBoardGroup,
        copyGameBoard,
        diceNumber,
        diceColor,
        firstTurn.current,
        prevRestMovements - 1
      )
      setGameBoard(highlightedGameBoard)
      if (!highlightedGameBoard.some((square) => square.border)) {
        handleRestMovements(0)
      }
    }
  }

  return {
    handleSquareReveal,
    gameBoard
  }
}
