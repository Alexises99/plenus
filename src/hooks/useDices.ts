import { getRandomNumber } from '@/utils/random'
import { useEffect, useState } from 'react'
import { DiceData, usePairDices } from './usePairDices'

const rand = getRandomNumber()

export function useDices() {
  const dice_1 = usePairDices(rand)
  const dice_2 = usePairDices(rand)
  const dice_3 = usePairDices(rand)

  const dices = [
    { ...dice_1, id: 1 },
    { ...dice_2, id: 2 },
    { ...dice_3, id: 3 }
  ]

  const [selectedDice, setSelectedDice] = useState<DiceData | null>(null)
  const [restMovements, setRestMovements] = useState<number>(
    selectedDice ? selectedDice.diceNumber : -1
  )
  const [impossible, setImpossible] = useState<boolean>(false)

  const activeDice = restMovements === 0

  const rollDices = () => dices.forEach((dice) => dice.rollDice())

  const handleRestMovements = (restMovements: number) =>
    setRestMovements(restMovements)

  const handleSelectedDice = (dice: DiceData) => {
    if (restMovements <= 0) {
      setSelectedDice(dice)
    }
  }

  const handleImpossible = (value: boolean) => {
    setImpossible(value)
  }

  useEffect(() => {
    if (selectedDice) {
      handleRestMovements(selectedDice.diceNumber)
    }
  }, [selectedDice])

  return {
    dices,
    selectedDice,
    restMovements,
    handleRestMovements,
    handleSelectedDice,
    activeDice,
    rollDices,
    handleImpossible,
    impossible
  }
}
