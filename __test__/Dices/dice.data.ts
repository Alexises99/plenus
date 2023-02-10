import { DiceData } from '@/hooks/usePairDices'

const dice_1: DiceData = {
  diceColor: 'orange',
  diceNumber: 3,
  handleDiceColor: jest.fn(),
  handleDiceNumber: jest.fn(),
  rollDice: jest.fn()
}

const dice_2: DiceData = {
  diceColor: 'green',
  diceNumber: 5,
  handleDiceColor: jest.fn(),
  handleDiceNumber: jest.fn(),
  rollDice: jest.fn()
}

export const dicesTestData = [dice_1, dice_2]
