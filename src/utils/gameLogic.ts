import { GameSquare } from '@/dtos/square'
import { SquareColor } from '@/types'

export function highlightGameBoard(
  square: GameSquare | null,
  groups: Record<SquareColor, Array<Array<number>>>,
  gameBoard: Array<GameSquare>,
  diceNumber: number,
  diceColor: SquareColor,
  firstTurn: boolean
) {
  // console.log(groups)
  const group = getCurrentGroups({
    diceNumber,
    firstTurn,
    gameBoard,
    groups: groups[diceColor],
    square
  })

  return group.length ? highlight(gameBoard, group) : []
}

/**
 * Check if game is possible in base of dices and actualGroup
 * @param param0
 * @returns true if the game can continue or false if needs another dice roll
 */
export function getCurrentGroups({
  firstTurn,
  square,
  gameBoard,
  groups,
  diceNumber
}: {
  firstTurn: boolean
  square: GameSquare | null
  groups: Array<Array<number>>
  gameBoard: Array<GameSquare>
  diceNumber: number
}): Array<number> {
  const actualGroup = getPossiblesGroups(groups, diceNumber, gameBoard)

  // No squares possibles in actual turn
  if (!actualGroup.length) {
    return []
  }

  // Check if all are revealed
  if (actualGroup.every(({ reveal }) => reveal)) {
    return []
  }

  // All squares are not in center
  if (firstTurn) {
    const ids = checkFirstTurn(actualGroup, groups, diceNumber)
    const centerElements = gameBoard.filter(
      (square) => ids.includes(square.id) && square.center
    )
    return centerElements.map(({ id }) => id)
  }

  return square
    ? checkSquareIsPossible(diceNumber, groups, square)
    : checkGroupIsSmallerThanDice(
        actualGroup.map(({ id }) => id),
        diceNumber
      )
    ? actualGroup.map(({ id }) => id)
    : []
}

/**
 * Called to check if square to handle reveal is possible or not
 * @param diceNumber
 * @returns
 */
function checkSquareIsPossible(
  diceNumber: number,
  currentGroups: Array<Array<number>>,
  square: GameSquare
) {
  if (square.reveal || !square.border) {
    return []
  }
  const groupOfActualSquare = extractSquareGroup(currentGroups, square)
  if (!checkGroupIsSmallerThanDice(groupOfActualSquare, diceNumber)) {
    return []
  } else {
    return groupOfActualSquare
  }
}

/**
 * Get actualGroup with current GameSquares to check if someone can be revealed
 * @param currentGroups
 * @param diceNumber
 * @param gameBoard
 * @returns
 */
function getPossiblesGroups(
  currentGroups: Array<Array<number>>,
  diceNumber: number,
  gameBoard: Array<GameSquare>
) {
  const possibleGroups = currentGroups
    .filter((group) => group.length >= diceNumber)
    .flat()

  const squaresInActualGroup = gameBoard.filter(({ id }) =>
    possibleGroups.includes(id)
  )

  return squaresInActualGroup
}

/**
 * Check if some square is center in first turn
 * @param actualGroup
 * @returns
 */
function checkFirstTurn(
  actualGroup: Array<GameSquare>,
  groups: Array<Array<number>>,
  diceNumber: number
) {
  const centerItems = actualGroup.filter(
    ({ center, reveal }) => center && !reveal
  )
  const [square] = centerItems

  if (
    square &&
    checkGroupIsSmallerThanDice(extractSquareGroup(groups, square), diceNumber)
  ) {
    return extractSquareGroup(groups, square)
  } else {
    return []
  }
}

/**
 * Highlight the gameboard with possibles squares to reveal
 * @param gameBoard
 * @param groupToHighlight
 * @returns
 */
function highlight(
  gameBoard: Array<GameSquare>,
  groupToHighlight: Array<number>
): Array<GameSquare> {
  const gameBoardHighlighted = gameBoard.map((square) =>
    handleChangeBorder(square, groupToHighlight.includes(square.id))
  )

  return gameBoardHighlighted
}

/**
 * Get te current squares of a group, to check if they can be used
 * @param groups
 * @param square
 * @returns
 */
function extractSquareGroup(groups: Array<Array<number>>, square: GameSquare) {
  const groupOfSquare = groups.find((group) => group.includes(square.id))

  return groupOfSquare ?? []
}

/**
 * Check if group members are bigger than dice the dice number
 * @param group
 * @param diceNumber
 * @returns
 */
function checkGroupIsSmallerThanDice(group: Array<number>, diceNumber: number) {
  return group.length >= diceNumber
}

/**
 * Change property border in base a condition
 * @param square
 * @param condition
 * @returns
 */
function handleChangeBorder(square: GameSquare, condition: boolean) {
  const copy = structuredClone(square)
  copy.border = !square.reveal && condition
  return copy
}
