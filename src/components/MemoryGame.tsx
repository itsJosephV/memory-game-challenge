import {useState} from "react";

import {BoardProps} from "../App";
import {RestartIcon} from "../icons/Restart";
import {LifeIcon} from "../icons/Life";
import {PlaceholderIcon} from "../icons/Placeholder";

import {randomlySortBoard} from "./utils/randomSorting";
import {cn} from "./utils/cn";
import {calculateMatches} from "./utils/calculateMatches";

export const MemoryGame = ({board}: {board: BoardProps[][]}) => {
  const [boardItems, setBoardItems] = useState(randomlySortBoard(board));
  const [matches, setMatches] = useState<BoardProps[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [attemps, setAttemps] = useState<number>(15);
  const [matchesLeft, setMatchesLeft] = useState<number>(calculateMatches(board));

  const flipCard = (id: number) => {
    if (attemps === 0) return;
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
    isMatch(id);
    const completed = updatedBoard.flat().every((card) => card.flipped);

    if (completed) {
      setGameCompleted(true);
    }
  };

  const isMatch = (id: number) => {
    const selectedItem = boardItems.flat().find((card) => card.id === id);

    if (!selectedItem || selectedItem.flipped || matches.includes(selectedItem)) return;

    const newMatches = [...matches, selectedItem];

    setMatches(newMatches);

    if (newMatches.length === 2) {
      const [item1, item2] = newMatches;

      if (item1.value === item2.value) {
        setMatches([]);
        const matchesLeftUpdated = calculateMatches(boardItems);

        setMatchesLeft(matchesLeftUpdated);
        console.log("match found");
        const updatedBoard = boardItems.map((row) =>
          row.map((card) => {
            if (card.id === item1.id || card.id === item2.id) {
              return {...card, matched: true, flipped: true};
            }

            return card;
          }),
        );

        setBoardItems(updatedBoard);
      } else {
        setAttemps((prev) => prev - 1);
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
    }
  };

  const resetGame = () => {
    setBoardItems(randomlySortBoard(board));
    setMatchesLeft(calculateMatches(board));
    setAttemps(15);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-end">
        <div className="inline-flex w-16 items-center justify-center gap-1 rounded-md bg-stone-700 py-1 text-red-300">
          <span>
            <LifeIcon />
          </span>
          &times;{attemps}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {boardItems.map((items) => {
          return items.map((item) => {
            return (
              <button
                key={item.id}
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-md border border-stone-100/10 text-3xl",
                  {
                    "bg-emerald-400": item.matched,
                    "pointer-events-none border-red-300": attemps === 0,
                  },
                )}
                onClick={() => flipCard(item.id)}
              >
                {item.flipped ? item.value : <PlaceholderIcon className="text-stone-700" />}
              </button>
            );
          });
        })}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 items-center rounded-md bg-stone-700 p-2 px-4 font-mono text-stone-300">
          <div className="flex justify-between">
            <p className="">Matches left: {matchesLeft}</p>

            {gameCompleted && <p className="text-green-300">Game Completed</p>}
            {attemps === 0 && <p className="text-red-300">Game Over</p>}
          </div>
        </div>
        <button className="items-center rounded-md bg-stone-700 p-2" onClick={resetGame}>
          <RestartIcon
            className={cn("h-6 w-6 text-stone-300", {
              "text-green-300": attemps === 0,
            })}
          />
        </button>
      </div>
    </div>
  );
};
