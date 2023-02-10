'use client'

import { DiceData } from '@/hooks/usePairDices'
import { DicePair } from './DicesPair'

interface DiceContainerProps {
  dices: Array<DiceData>
  handleSelectedDice: (dice: DiceData) => void
  activeDice: boolean
  restMovements: number
  rollDices: () => void
}

function DicesContainer({
  activeDice,
  dices,
  handleSelectedDice,
  restMovements,
  rollDices
}: DiceContainerProps) {
  return (
    <section className="flex justify-end pr-20 pt-10">
      <div className="flex flex-row items-center gap-6 border-2 p-4 border-blue-700">
        {dices.map((dice, index) => (
          <DicePair
            activeDice={activeDice}
            dice={dice}
            handleSelectedDice={handleSelectedDice}
            key={index}
          />
        ))}

        <span className="text-white text-lg">
          Movimientos restantes:{' '}
          <span className="font-semibold">{restMovements}</span>
        </span>
        <button
          className={`w-full ${
            activeDice ? 'bg-green-300' : 'bg-red-300'
          } rounded-full py-3`}
          onClick={rollDices}
        >
          Tirar
        </button>
      </div>
    </section>
  )
}

export default DicesContainer
