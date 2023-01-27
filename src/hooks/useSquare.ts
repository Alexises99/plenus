import { GameSquare } from '@/dtos/square'
import { useState } from 'react'

export function useSquare(square: GameSquare) {
  const [selected, setSelected] = useState<boolean>(false)
  const { bottom, center, color, left, reveal, right, star, top } = square

  const handleDiscover = () => {
    setSelected(true)
    square.reveal = true
  }

  return {
    selected,
    handleDiscover
  }
}
