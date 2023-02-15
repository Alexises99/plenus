'use client'

import { DiceData, DiceDataWithId } from '@/hooks/usePairDices'
import { DicePair } from './DicesPair'

interface DiceContainerProps {
  dices: Array<DiceDataWithId>
  handleSelectedDice: (dice: DiceDataWithId) => void
  activeDice: boolean
  restMovements: number
  rollDices: () => void
  selectedDice: number
}

function DicesContainer({
  activeDice,
  dices,
  handleSelectedDice,
  restMovements,
  selectedDice,
  rollDices
}: DiceContainerProps) {
  return (
    <div className="flex w-full justify-center md:h-full md:justify-center md:items-center md:px-2 md:w-1/3">
      <section className="flex flex-col self-start md:self-auto">
        <div className="flex flex-row  items-center justify-between gap-3 md:flex-col md:gap-5 lg:gap-6 p-2 lg:p-4">
          {dices.map((dice, index) => (
            <DicePair
              activeDice={activeDice}
              dice={dice}
              handleSelectedDice={handleSelectedDice}
              key={index}
              selectedDice={selectedDice === dice.id}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-white text-xl font-bold">
            Movimientos restantes:{' '}
            <span className="font-semibold" role="status">
              {restMovements}
            </span>
          </span>
          <button
            className={`w-full text-xl font-bold text-zinc-900 ${
              activeDice ? 'bg-green-300' : 'bg-red-300'
            } rounded-full py-2 lg:py-3`}
            onClick={rollDices}
          >
            Tirar
          </button>
        </div>
      </section>
    </div>
  )
}

export default DicesContainer
