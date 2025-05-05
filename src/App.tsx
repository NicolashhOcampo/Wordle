import { useEffect, useMemo, useRef, useState } from "react"
import { Wordle } from "./classes/Wordle";
import { CreateWordle } from "./components/CreateWordle";
import { PlayWordle } from "./components/PlayWordle";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [secretWord, setSecretWord] = useState("");
  const wordle = useMemo(() => new Wordle(secretWord), [secretWord]);

  useEffect(() => {
    console.log("montado")
    const handleClick = () => {
      inputRef.current?.focus();
    };
  
    document.addEventListener("click", handleClick);
  
    inputRef.current?.focus();
  
    return () => {
      document.removeEventListener("click", handleClick);
      console.log("desmontado")
    };
  }, [secretWord]);


  if (wordle.getWordLength() === 0){
    return(
      <div className="w-full h-full flex justify-center items-center">
        <CreateWordle setWord={setSecretWord}/>
      </div>
    )
  }

  return (
    <>
      <PlayWordle wordle={wordle}/>
    </>
  )
}

export function isAlphabet(str: string) {
  return /^([a-zA-Z]*)$/.test(str);
}

export default App
