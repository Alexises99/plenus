'use client'

import { DiceBasic, DiceData, DiceDataWithId } from '@/hooks/usePairDices'
import { getSquareColor } from '@/utils/colors'
import Dice from './Dice'

interface DiceContainerProps {
  selectedDice: boolean
  activeDice: boolean
  dice: DiceDataWithId
  handleSelectedDice: (dice: DiceDataWithId) => void
}

export function DicePair({
  activeDice,
  dice,
  selectedDice,
  handleSelectedDice
}: DiceContainerProps) {
  const { diceColor, diceNumber } = dice
  return (
    <div
      data-testid="dice-pair"
      className={`flex justify-center gap-2 ${
        selectedDice && 'border-4 animate-border border-red-500 p-4'
      }`}
      onClick={() => handleSelectedDice(dice)}
    >
      <Dice active={activeDice}>{diceNumber}</Dice>
      <Dice active={activeDice}>
        <div
          data-testid="dice-color"
          className={`aspect-square w-full rounded-full ${getSquareColor(
            diceColor
          )}`}
        />
      </Dice>
    </div>
  )
}
