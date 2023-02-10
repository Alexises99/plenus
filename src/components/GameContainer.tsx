import { Square as SquareType } from '@/dtos/square'
import { prepareGameBoard, prepareGroups } from '@/utils/group'
import gameBoard from '../../game-board.json'
import GameBoard from './GameBoard/GameBoard'

export function GameContainer() {
  const finalGameBoard = prepareGameBoard(gameBoard as SquareType[][]).flat()
  const gameBoardGroup = prepareGroups(finalGameBoard)

  return (
    <GameBoard gameBoard={finalGameBoard} gameBoardGroup={gameBoardGroup} />
  )
}
