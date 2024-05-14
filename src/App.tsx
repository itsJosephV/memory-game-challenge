import {MemoryGame} from "./components/MemoryGame";
import {BoardProps} from "./types";

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

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="font-mono text-xl font-bold leading-[4rem]">memory-game-challenge</header>
      <section className="flex items-center justify-center py-8">
        <MemoryGame board={board} />
      </section>
      <footer className="text-center font-mono leading-[4rem] opacity-70">
        © {new Date().getFullYear()} memory-game-challenge
      </footer>
    </main>
  );
}

export default App;
