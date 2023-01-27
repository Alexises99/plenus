import { SquareColor } from '../types'

export interface Square {
  color: SquareColor
  star?: boolean
  center?: boolean
  reveal?: boolean
  border: boolean
}

export interface SquareId extends Square {
  id: number
}

export interface SquareSides {
  right: Required<SquareId> | null
  left: Required<SquareId> | null
  bottom: Required<SquareId> | null
  top: Required<SquareId> | null
}

export interface GameSquare extends Required<SquareId>, SquareSides {}
