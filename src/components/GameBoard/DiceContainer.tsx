import { SquareColor } from '@/types'
import { getSquareColor } from '@/utils/colors'
import { randomIntFromInterval } from '@/utils/random'
import Dice from './Dice'

interface DiceContainerProps {
  activeDice: boolean
  diceNumber: number
  diceColor: SquareColor
}

export function DiceContainer({
  activeDice,
  diceColor,
  diceNumber
}: DiceContainerProps) {
  const number1 = randomIntFromInterval(Math.random(), 1, 5)
  const number2 = randomIntFromInterval(Math.random(), 1, 5)

  return (
    <>
      <Dice active={activeDice}>{diceNumber}</Dice>
      <Dice active={activeDice}>
        <div
          className={`w-8 h-8 rounded-full ${getSquareColor(diceColor)}`}
        ></div>
      </Dice>
    </>
  )
}
