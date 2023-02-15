import { getRandomNumber } from '@/utils/random'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DiceDataWithId, usePairDices } from './usePairDices'

export function useDices() {
  const rand = useMemo(() => getRandomNumber(), [])
  const dice_1 = usePairDices(rand)
  const dice_2 = usePairDices(rand)
  const dice_3 = usePairDices(rand)

  const dices = [
    { ...dice_1, id: 1 },
    { ...dice_2, id: 2 },
    { ...dice_3, id: 3 }
  ]

  const [selectedDice, setSelectedDice] = useState<DiceDataWithId | null>(null)
  const [restMovements, setRestMovements] = useState<number>(
    selectedDice ? selectedDice.diceNumber : -1
  )
  const [impossible, setImpossible] = useState<boolean>(false)

  const activeDice = restMovements === 0

  const rollDices = () => dices.forEach((dice) => dice.rollDice())

  const handleRestMovements = useCallback(
    (restMovements: number) => setRestMovements(restMovements),
    []
  )

  const handleSelectedDice = (dice: DiceDataWithId) => {
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
  }, [selectedDice, handleRestMovements])

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
