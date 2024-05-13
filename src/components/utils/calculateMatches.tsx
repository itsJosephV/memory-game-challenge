import {BoardProps} from "../../App";

export const calculateMatches = (boardItems: BoardProps[][]) => {
  return Math.floor(boardItems.flat().filter((item) => !item.flipped).length / 2);
};
