'use client'

import { DiceBasic, DiceData } from '@/hooks/usePairDices'
import { getSquareColor } from '@/utils/colors'
import Dice from './Dice'

interface DiceContainerProps {
  activeDice: boolean
  dice: DiceData
  handleSelectedDice: (dice: DiceData) => void
}

export function DicePair({
  activeDice,
  dice,
  handleSelectedDice
}: DiceContainerProps) {
  const { diceColor, diceNumber } = dice
  return (
    <div
      data-testid="dice-pair"
      className="flex justify-center gap-2 hover:bg-green-400"
      onClick={() => handleSelectedDice(dice)}
    >
      <Dice active={activeDice}>{diceNumber}</Dice>
      <Dice active={activeDice}>
        <div
          data-testid="dice-color"
          className={`w-8 h-8 rounded-full ${getSquareColor(diceColor)}`}
        />
      </Dice>
    </div>
  )
}
