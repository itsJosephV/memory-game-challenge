import {useEffect, useState} from "react";

import {BoardProps} from "../App";
import {RestartIcon} from "../icons/Restart";

export const MemoryGame = ({board}: {board: BoardProps[][]}) => {
  const [boardItems, setBoardItems] = useState(board);
  const [matches, setMatches] = useState<BoardProps[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  const flipCard = (id: number) => {
    if (matches.length === 2) return;
    const updatedBoard = boardItems.map((row) =>
      row.map((card) => {
        if (card.id === id) {
          return {...card, flipped: true};
        }

        return card;
      }),
    );

    setBoardItems(updatedBoard);

    handleMatch(id);
  };

  const isBoardCompleted = () => {
    const completed = boardItems.flat().every((card) => card.flipped);

    if (completed && !gameCompleted) {
      setGameCompleted(true);
    }
  };

  const handleMatch = (id: number) => {
    const selectedItem = boardItems.flat().find((card) => card.id === id);

    if (!selectedItem || selectedItem.flipped || matches.includes(selectedItem)) return;

    if (matches.length === 2) {
      setMatches([]);

      return;
    }
    setMatches([...matches, selectedItem]);
  };

  useEffect(() => {
    if (matches.length !== 2) return;
    const [item1, item2] = matches;

    if (item1.value === item2.value) {
      setMatches([]);
      isBoardCompleted();

      console.log("match found");
    } else {
      setTimeout(() => {
        const updatedBoard = boardItems.map((row) =>
          row.map((card) => {
            if (card.id === item1.id || card.id === item2.id) {
              return {...card, flipped: false};
            }

            return card;
          }),
        );

        setBoardItems(updatedBoard);
        setMatches([]);
        console.log("match not found");
      }, 1000);
    }
  }, [matches, boardItems]);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-5 gap-1">
        {boardItems.map((items) => {
          return items.map((item) => {
            return (
              <button
                key={item.id}
                className="h-20 w-20 rounded-md border border-stone-100/10 text-3xl"
                onClick={() => flipCard(item.id)}
              >
                {item.flipped ? item.value : "?"}
              </button>
            );
          });
        })}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 items-center rounded-md bg-stone-700 p-2 px-4 font-mono text-stone-300">
          <div className="flex justify-between">
            <p className="">Matches left: 2</p>
            {gameCompleted && <p className="text-emerald-500">Game completed</p>}
          </div>
        </div>
        <button className="items-center rounded-md bg-stone-700 p-2">
          <RestartIcon className="h-6 w-6 text-stone-300" />
        </button>
      </div>
    </div>
  );
};
