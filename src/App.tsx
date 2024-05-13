import {MemoryGame} from "./components/MemoryGame";

export interface BoardProps {
  id: number;
  flipped: boolean;
  value: string;
}

function App() {
  const board = [
    [
      {id: 1, flipped: false, value: "😀"},
      {id: 2, flipped: false, value: "😊"},
      {id: 3, flipped: false, value: "😎"},
      {id: 4, flipped: false, value: "😍"},
      {id: 5, flipped: false, value: "🥳"},
    ],
    [
      {id: 6, flipped: false, value: "😀"},
      {id: 7, flipped: false, value: "😊"},
      {id: 8, flipped: false, value: "😎"},
      {id: 9, flipped: false, value: "😍"},
      {id: 10, flipped: false, value: "🥳"},
    ],
    [
      {id: 11, flipped: false, value: "🎉"},
      {id: 12, flipped: false, value: "🥳"},
      {id: 13, flipped: false, value: "🎁"},
      {id: 14, flipped: false, value: "🎂"},
      {id: 15, flipped: false, value: "🍰"},
    ],
    [
      {id: 16, flipped: false, value: "🎉"},
      {id: 17, flipped: false, value: "🥳"},
      {id: 18, flipped: false, value: "🎁"},
      {id: 19, flipped: false, value: "🎂"},
      {id: 20, flipped: false, value: "🍰"},
    ],
  ];

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="text-xl font-bold leading-[4rem]">memory-game-challenge</header>
      <section className="flex items-center justify-center py-8">
        <MemoryGame board={board} />
      </section>
      <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} memory-game-challenge
      </footer>
    </main>
  );
}

export default App;
