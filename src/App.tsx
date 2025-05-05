import { useMemo, useState } from "react"
import { Wordle } from "./classes/Wordle";
import { CreateWordle } from "./components/CreateWordle";
import { PlayWordle } from "./components/PlayWordle";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const wordle = useMemo(() => new Wordle(secretWord), [secretWord]);

  if (wordle.getWordLength() === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CreateWordle setWord={setSecretWord} />
      </div>
    )
  }

  return (
    <>
      <PlayWordle wordle={wordle} />
    </>
  )
}



export default App
