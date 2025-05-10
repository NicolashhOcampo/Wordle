import { useEffect, useMemo, useState } from "react"
import { Wordle } from "./classes/Wordle";
import { PlayWordle } from "./components/PlayWordle";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const wordle = useMemo(() => new Wordle(secretWord), [secretWord]);

  useEffect(()=>{
    fetch("https://random-word-api.herokuapp.com/word?length=5&lang=ES")
    .then(res => res.json())
    .then(([data]) => setSecretWord(data))
    .catch(e => {console.log(e), setSecretWord("error")})
  }, [])

  // if (wordle.getWordLength() === 0) {
  //   return (
  //     <div className="w-full h-full flex justify-center items-center">
  //       <CreateWordle  />
  //     </div>
  //   )
  // }

  return (
    <>
      <PlayWordle wordle={wordle}/>
    </>
  )
}



export default App
