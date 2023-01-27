import { useState } from 'react'

export function useDice<T>(initialState: () => T) {
  const [diceValue, setDiceValue] = useState<T>(initialState)

  const handleDice = (value: T) => {
    setDiceValue(value)
  }

  return {
    diceValue,
    handleDice
  }
}
