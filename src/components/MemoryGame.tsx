import {useState} from "react";

import {type BoardProps} from "../types";
import {RestartIcon} from "../icons/Restart";
import {LifeIcon} from "../icons/Life";
import {PlaceholderIcon} from "../icons/Placeholder";
import {cn} from "../utils/cn";
import {randomlySortBoard} from "../utils/randomSorting";
import {calculateMatches} from "../utils/calculateMatches";

export const MemoryGame = ({board}: {board: BoardProps[][]}) => {
  const [boardItems, setBoardItems] = useState<BoardProps[][]>(randomlySortBoard(board));
  const [matches, setMatches] = useState<BoardProps[]>([]);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [attemps, setAttemps] = useState<number>(15);
  const [matchesLeft, setMatchesLeft] = useState<number>(calculateMatches(board));
  const [isLifeLost, setIsLifeLost] = useState<boolean>(false);

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
        setIsLifeLost(true);
        setTimeout(() => {
          const updatedBoard = boardItems.map((row) =>
            row.map((card) => {
              if (card.id === item1.id || card.id === item2.id) {
                return {...card, flipped: false};
              }

              return card;
            }),
          );

          setIsLifeLost(false);
          setBoardItems(updatedBoard);
          setMatches([]);
          console.log("match not found");
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    if (attemps > 0) {
      confirm("The board will be re-sorted, are you sure?");
    }
    setBoardItems(randomlySortBoard(board));
    setMatchesLeft(calculateMatches(board));
    setMatches([]);
    setAttemps(15);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "ml-auto inline-flex w-16 items-center justify-center gap-1 rounded-md bg-stone-700 py-1 font-mono text-red-300",
          {
            shake: isLifeLost,
          },
        )}
      >
        <span>
          <LifeIcon />
        </span>
        &times;{attemps}
      </div>

      <div className="grid grid-cols-5 gap-1">
        {boardItems.map((items) => {
          return items.map((item) => {
            return (
              <button
                key={item.id}
                className={cn(
                  "group flex h-16 w-16 items-center justify-center rounded-md border border-stone-100/10 text-2xl duration-200 hover:border-stone-100/30 md:h-20 md:w-20 md:text-3xl",
                  {
                    "bg-emerald-400": item.matched,
                    "pointer-events-none border-red-300": attemps === 0,
                  },
                )}
                onClick={() => flipCard(item.id)}
              >
                {item.flipped ? (
                  item.value
                ) : (
                  <PlaceholderIcon
                    className={cn("text-stone-100/20 duration-200 group-hover:text-stone-100/30", {
                      "text-red-300": attemps === 0,
                    })}
                  />
                )}
              </button>
            );
          });
        })}
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 items-center justify-between rounded-md bg-stone-700 p-2 px-4 font-mono text-stone-300">
          <div>
            <p className="text-sm">Matches left: {matchesLeft}</p>
          </div>

          <div>
            {gameCompleted && <p className="text-sm text-green-300 md:text-base">Game Completed</p>}
            {attemps === 0 && <p className="text-sm text-red-300 md:text-base">Game Over</p>}
          </div>
        </div>
        <button className="items-center rounded-md bg-stone-700 p-2" onClick={resetGame}>
          <RestartIcon
            className={cn("h-6 w-6 text-stone-300 duration-200 hover:text-stone-400", {
              "text-green-300 hover:text-green-400": attemps === 0,
            })}
          />
        </button>
      </div>
    </div>
  );
};
