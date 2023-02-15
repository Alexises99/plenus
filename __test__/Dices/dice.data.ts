import { DiceData, DiceDataWithId } from '@/hooks/usePairDices'

const dice_1: DiceDataWithId = {
  diceColor: 'orange',
  id: 1,
  diceNumber: 3,
  handleDiceColor: jest.fn(),
  handleDiceNumber: jest.fn(),
  rollDice: jest.fn()
}

const dice_2: DiceDataWithId = {
  diceColor: 'green',
  id: 2,
  diceNumber: 5,
  handleDiceColor: jest.fn(),
  handleDiceNumber: jest.fn(),
  rollDice: jest.fn()
}

export const dicesTestData = [dice_1, dice_2]
