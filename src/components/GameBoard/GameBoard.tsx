import { GameSquare, Square, Square as SquareType } from '@/dtos/square'
import { prepareGameBoard, prepareGroups } from '@/utils/group'
import gameBoard from '../../../game-board.json'
import GameBoardPlay from './GameBoardPlay'

export function GameBoard() {
  const finalGameBoard = prepareGameBoard(gameBoard as SquareType[][]).flat()
  const gameBoardGroup = prepareGroups(finalGameBoard)

  return (
    <GameBoardPlay gameBoard={finalGameBoard} gameBoardGroup={gameBoardGroup} />
  )
}
