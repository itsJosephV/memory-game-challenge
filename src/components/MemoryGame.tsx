import {useState} from "react";

import {type BoardProps} from "../types";
import {RestartIcon} from "../icons/Restart";
import {LifeIcon} from "../icons/Life";
import {PlaceholderIcon} from "../icons/Placeholder";
import {cn} from "../utils/cn";
import {randomlySortBoard} from "../utils/randomSorting";
import {calculateMatches} from "../utils/calculateMatches";

export const MemoryGame = ({board}: {board: BoardProps[][]}) => {
  const [boardCards, setBoardCards] = useState<BoardProps[][]>(randomlySortBoard(board));
  const [cardsToCompare, setCardsToCompare] = useState<BoardProps[]>([]);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(15);
  const [matchesLeft, setMatchesLeft] = useState<number>(calculateMatches(board));
  const [isLifeLost, setIsLifeLost] = useState<boolean>(false);

  function handleCardFlip(id: number) {
    //early return when player ran out of attemps
    if (attempts === 0) return;

    //early return if the matches state is full
    if (cardsToCompare.length === 2) return;

    const updatedBoard = boardCards.map((row) =>
      row.map((card) => {
        if (card.id === id) {
          return {...card, flipped: true};
        }

        return card;
      }),
    );

    // Update the item in boardItems when its flipped property set to true
    setBoardCards(updatedBoard);

    // Find the selectedItem
    const selectedCard = boardCards.flat().find((card) => card.id === id);

    // Early return if the selectedItem is undefined or if it's already flipped
    if (!selectedCard || selectedCard.flipped) return;

    // Unify both items to be set
    const selectedCards = [...cardsToCompare, selectedCard];

    setCardsToCompare(selectedCards);

    //pass the items selected to be compared && the updated board
    handleIsAMatch(selectedCards, updatedBoard);

    const completed = updatedBoard.flat().every((card) => card.flipped);

    // Check if all the items "flipped" property are true, if so, the game is completed
    if (completed) {
      setGameCompleted(true);
    }
  }

  function handleIsAMatch(newMatches: BoardProps[], updatedBoard: BoardProps[][]) {
    // If there are not two items in the matches state, check for a match
    if (newMatches.length !== 2) return;

    const [cardOne, cardTwo] = newMatches;

    // If it's a match, update the board and matches state accordingly
    if (cardOne.value === cardTwo.value) {
      setCardsToCompare([]);
      setMatchesLeft(calculateMatches(boardCards));
      const boardWithMatchedCards = updatedBoard.map((row) => {
        return row.map((card) => {
          if (card.id === cardOne.id || card.id === cardTwo.id) {
            return {...card, matched: true};
          }

          return card;
        });
      });

      setBoardCards(boardWithMatchedCards);
    } else {
      // If it's not a match, decrement attempts,
      // show life lost animation,
      // and flip the cards back after a delay
      setAttempts((prev) => prev - 1);
      setIsLifeLost(true);
      setTimeout(() => {
        const boardWithRevertedFlips = updatedBoard.map((row) => {
          return row.map((card) => {
            if (card.id === cardOne.id || card.id === cardTwo.id) {
              return {...card, flipped: false};
            }

            return card;
          });
        });

        setIsLifeLost(false);
        setBoardCards(boardWithRevertedFlips);
        setCardsToCompare([]);
      }, 1000);
    }
  }

  function resetGame() {
    if (attempts > 0 && !gameCompleted) {
      confirm("The board will be re-sorted, are you sure?");
    }
    setGameCompleted(false);
    setBoardCards(randomlySortBoard(board));
    setMatchesLeft(calculateMatches(board));
    setCardsToCompare([]);
    setAttempts(15);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "ml-auto inline-flex w-16 items-center justify-center gap-1 rounded-md bg-stone-700 py-1 font-mono text-red-300",
          {
            "shake-box": isLifeLost,
          },
        )}
      >
        <span>
          {/**TODO: Broken heart Icon at 0 attemps */}
          <LifeIcon />
        </span>
        &times;{attempts}
      </div>

      <div className="grid grid-cols-5 gap-1">
        {boardCards.map((items) => {
          return items.map((item) => {
            return (
              <button
                key={item.id}
                className={cn(
                  "group flex h-16 w-16 items-center justify-center rounded-md border border-stone-100/10 text-2xl duration-200 hover:border-stone-100/30 md:h-20 md:w-20 md:text-3xl",
                  {
                    "bg-emerald-400": item.matched,
                    "pointer-events-none border-red-300": attempts === 0,
                  },
                )}
                onClick={() => handleCardFlip(item.id)}
              >
                {item.flipped ? (
                  item.value
                ) : (
                  <PlaceholderIcon
                    className={cn("text-stone-100/20 duration-200 group-hover:text-stone-100/30", {
                      "text-red-300": attempts === 0,
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
            {attempts === 0 && <p className="text-sm text-red-300 md:text-base">Game Over</p>}
          </div>
        </div>
        {/**TODO: Disable button when attempts are untouched? */}
        <button
          className="group items-center rounded-md bg-stone-700 p-2 disabled:pointer-events-none"
          disabled={attempts === 15}
          onClick={resetGame}
        >
          <RestartIcon
            className={cn("h-6 w-6 text-stone-300 duration-200 group-hover:text-stone-400", {
              "text-green-300 group-hover:text-green-400": attempts === 0,
              "text-stone-500": attempts === 15,
            })}
          />
        </button>
      </div>
    </div>
  );
};
