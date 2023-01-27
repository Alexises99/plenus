import { GameSquare, Square, SquareId, SquareSides } from '@/dtos/square'
import { SquareColor } from '@/types'

function populateWithId(
  gameBoard: Array<Array<Square>>
): Array<Array<Required<SquareId>>> {
  let id = 0
  return gameBoard.map((row) => {
    return row.map(({ center, color, reveal, star }): Required<SquareId> => {
      return {
        center: center ?? false,
        color: color,
        reveal: reveal ?? false,
        star: star ?? false,
        id: id++,
        border: false
      }
    })
  })
}

function assignSides(
  square: Required<SquareId>,
  squareToAssign: Record<keyof SquareSides, Required<SquareId> | null>
): GameSquare {
  const gameSquare: GameSquare = {
    ...squareToAssign,
    ...square
  }
  return gameSquare
}

export function prepareGameBoard(
  gameBoard: Array<Array<Square>>
): Array<Array<GameSquare>> {
  const processedGameBoard = populateWithId(gameBoard)
  return processedGameBoard.map((row, rowIndex) => {
    return row.map((square, columnIndex) => {
      const right = row[columnIndex + 1] ?? null
      const left = row[columnIndex - 1] ?? null
      const preTop = processedGameBoard[rowIndex - 1]
      const top = preTop ? processedGameBoard[rowIndex - 1][columnIndex] : null
      const preBottom = processedGameBoard[rowIndex + 1]
      const bottom = preBottom
        ? processedGameBoard[rowIndex + 1][columnIndex]
        : null
      return assignSides(square, { right, left, bottom, top })
    })
  })
}

function findAdyacent(id: number, gameBoard: Array<GameSquare>) {
  const element = gameBoard.find((square) => square.id === id)
  return element as GameSquare
}

//caution duplicates
function findAdyacents(
  square: GameSquare,
  gameBoard: Array<GameSquare>,
  prev: Array<number>
) {
  const result: Array<number> = []
  const { bottom, left, right, top, color, id } = square
  if (right && !prev.includes(right.id) && right.color === color) {
    const { id } = right
    const rightFind = findAdyacent(id, gameBoard)
    result.push(id)
    const elements = findAdyacents(rightFind, gameBoard, [...prev, id])
    result.push(...elements)
  }
  if (left && !prev.includes(left.id) && left.color === color) {
    const { id } = left
    const leftFind = findAdyacent(id, gameBoard)
    result.push(id)
    const elements = findAdyacents(leftFind, gameBoard, [...prev, id])
    result.push(...elements)
  }
  if (bottom && !prev.includes(bottom.id) && bottom.color === color) {
    const { id } = bottom
    const bottomFind = findAdyacent(id, gameBoard)
    result.push(id)
    const elements = findAdyacents(bottomFind, gameBoard, [...prev, id])
    result.push(...elements)
  }
  if (top && !prev.includes(top.id) && top.color === color) {
    const { id } = top
    const topFind = findAdyacent(id, gameBoard)
    result.push(id)
    const elements = findAdyacents(topFind, gameBoard, [...prev, id])
    result.push(...elements)
  }
  return result
}

export function prepareGroups(gameBoard: Array<GameSquare>) {
  const group: Record<SquareColor, Array<Array<number>>> = {
    blue: [],
    green: [],
    orange: [],
    red: [],
    yellow: []
  }
  gameBoard.forEach((element) => {
    if (!element.reveal) {
      const set = new Set([
        element.id,
        ...findAdyacents(element, gameBoard, [element.id])
      ])
      group[element.color].push([...set])
    }
    !element.reveal && group[element.color].push()
  })

  return group
}

export {}
