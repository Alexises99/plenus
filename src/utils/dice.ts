import { SquareColor } from '@/types'

const randomColor: Record<number, SquareColor> = {
  1: 'red',
  2: 'blue',
  3: 'yellow',
  4: 'orange',
  5: 'green'
}

export function checkDice(restMovements: number) {
  return restMovements <= 0
}

export function generateRandomNumbers(generateRandom: () => number): {
  diceNumber: number
  diceColor: SquareColor
} {
  const diceNumber = generateRandom()
  const diceColor = randomColor[generateRandom()]
  return {
    diceColor,
    diceNumber
  }
}
