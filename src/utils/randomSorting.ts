import {BoardProps} from "../../App";

export const randomlySortBoard = (board: BoardProps[][]): BoardProps[][] => {
  const flatBoard = board.flat();

  const sortedFlatBoard = flatBoard.sort(() => Math.random() - 0.5);

  const sortedBoard: BoardProps[][] = [];

  while (sortedFlatBoard.length) {
    sortedBoard.push(sortedFlatBoard.splice(0, board[0].length));
  }

  return sortedBoard;
};
