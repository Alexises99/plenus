import { SquareColor } from '@/types'
import { generateRandomNumbers } from '@/utils/dice'
import { randomIntFromInterval } from '@/utils/random'
import { useCallback } from 'react'
import { useDice } from './useDice'

export interface DiceBasic {
  diceNumber: number
  diceColor: SquareColor
}

export interface DiceData extends DiceBasic {
  handleDiceNumber: (value: number) => void
  handleDiceColor: (value: SquareColor) => void
  rollDice: () => void
}

export interface DiceDataWithId extends DiceData {
  id: number
}

export function usePairDices(rand: () => number): DiceData {
  const generateRandom = useCallback(
    () => randomIntFromInterval(rand(), 1, 5),
    []
  )
  const { diceValue: diceNumber, handleDice: handleDiceNumber } =
    useDice<number>(() => generateRandomNumbers(generateRandom).diceNumber)
  const { diceValue: diceColor, handleDice: handleDiceColor } =
    useDice<SquareColor>(() => generateRandomNumbers(generateRandom).diceColor)

  const rollDice = () => {
    const { diceColor, diceNumber } = generateRandomNumbers(generateRandom)
    handleDiceNumber(diceNumber)
    handleDiceColor(diceColor)
  }

  return {
    diceNumber,
    diceColor,
    handleDiceNumber,
    handleDiceColor,
    rollDice
  }
}
