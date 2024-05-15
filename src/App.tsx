import {MemoryGame} from "./components/MemoryGame";
import {type BoardProps} from "./types";

function App() {
  const board: BoardProps[][] = [
    [
      {id: 1, flipped: false, value: "😀", matched: false},
      {id: 2, flipped: false, value: "😊", matched: false},
      {id: 3, flipped: false, value: "😎", matched: false},
      {id: 4, flipped: false, value: "😍", matched: false},
      {id: 5, flipped: false, value: "🥳", matched: false},
    ],
    [
      {id: 6, flipped: false, value: "😀", matched: false},
      {id: 7, flipped: false, value: "😊", matched: false},
      {id: 8, flipped: false, value: "😎", matched: false},
      {id: 9, flipped: false, value: "😍", matched: false},
      {id: 10, flipped: false, value: "🥳", matched: false},
    ],
    [
      {id: 11, flipped: false, value: "🎉", matched: false},
      {id: 12, flipped: false, value: "🥹", matched: false},
      {id: 13, flipped: false, value: "🎁", matched: false},
      {id: 14, flipped: false, value: "🎂", matched: false},
      {id: 15, flipped: false, value: "🍰", matched: false},
    ],
    [
      {id: 16, flipped: false, value: "🎉", matched: false},
      {id: 17, flipped: false, value: "🥹", matched: false},
      {id: 18, flipped: false, value: "🎁", matched: false},
      {id: 19, flipped: false, value: "🎂", matched: false},
      {id: 20, flipped: false, value: "🍰", matched: false},
    ],
  ];

  const linkStyles =
    "cursor-pointer text-sm text-stone-400 duration-200 hover:text-stone-100 md:text-base";

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="flex flex-wrap items-center justify-between gap-1.5 py-4 font-mono">
        <h1 className="whitespace-nowrap text-lg font-bold md:text-xl">Card Match Game</h1>
        <div className="flex gap-3">
          <a
            className={linkStyles}
            href="https://github.com/itsJosephV/memory-game-challenge"
            rel="noopener noreferrer"
            target="_blank"
          >
            Source
          </a>
          <a
            className={linkStyles}
            href="https://www.linkedin.com/in/josephvp"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </header>
      <section className="flex items-center justify-center py-8">
        <MemoryGame board={board} />
      </section>
      <footer className="py-4 text-center font-mono text-sm opacity-70">
        {new Date().getFullYear()} · Crafted by{" "}
        <a
          className="text-purple-400"
          href="https://github.com/itsJosephV"
          rel="noopener noreferrer"
          target="_blank"
        >
          @itsJosephV
        </a>
      </footer>
    </main>
  );
}

export default App;
