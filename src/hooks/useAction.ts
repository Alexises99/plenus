import { GameSquare } from '@/dtos/square'
import { SquareColor } from '@/types'
import { checkDice, generateRandomNumbers } from '@/utils/dice'
import { highlightGameBoard } from '@/utils/gameLogic'
import { getRandomNumber, randomIntFromInterval } from '@/utils/random'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDice } from './useDice'

interface useActionParams {
  initialGameBoard: GameSquare[]
  gameBoardGroup: Record<SquareColor, Array<Array<number>>>
}

let lastSquareVisited: GameSquare | null = null
const rand = getRandomNumber()

export function useAction({
  initialGameBoard,
  gameBoardGroup
}: useActionParams) {
  const [gameBoard, setGameBoard] = useState<GameSquare[]>(initialGameBoard)

  const generateRandom = useCallback(
    () => randomIntFromInterval(rand(), 1, 5),
    []
  )
  const { diceValue: diceNumber, handleDice: handleDiceNumber } =
    useDice<number>(() => generateRandomNumbers(generateRandom).diceNumber)
  const { diceValue: diceColor, handleDice: handleDiceColor } =
    useDice<SquareColor>(() => generateRandomNumbers(generateRandom).diceColor)
  const [restMovements, setRestMovements] = useState<number>(diceNumber)
  const firstTurn = useRef<boolean>(true)

  useEffect(() => {
    rollDice()
  }, [])

  const rollDiceGame = () => {
    if (!checkDice(restMovements)) {
      return
    }
    rollDice()
  }

  const rollDice = () => {
    const { diceColor, diceNumber } = generateRandomNumbers(generateRandom)

    setRestMovements(diceNumber)
    handleDiceNumber(diceNumber)
    handleDiceColor(diceColor)

    const highlightedGameBoard = highlightGameBoard(
      lastSquareVisited,
      gameBoardGroup,
      gameBoard,
      diceNumber,
      diceColor,
      firstTurn.current
    )
    lastSquareVisited = null
    !highlightedGameBoard.length
      ? rollDice()
      : setGameBoard(highlightedGameBoard)
  }

  const handleSquareReveal = (square: GameSquare) => {
    if (!square.border || restMovements < 1) return
    setRestMovements((prevState) => prevState - 1)
    firstTurn.current = false
    lastSquareVisited = square

    const copyGameBoard = gameBoard.map((squareItem) => ({
      ...squareItem,
      reveal: squareItem.reveal ? true : squareItem.id === square.id
    }))

    setGameBoard(copyGameBoard)
  }

  const activeDice = !restMovements

  return {
    diceNumber,
    diceColor,
    rollDice: rollDiceGame,
    handleSquareReveal,
    activeDice,
    restMovements,
    gameBoard
  }
}
