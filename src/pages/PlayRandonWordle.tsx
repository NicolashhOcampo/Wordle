import { useEffect, useMemo, useState } from "react"
import { Wordle } from "../classes/Wordle";
import { PlayWordle } from "../components/PlayWordle";
import { formatWord } from "../utils/stringUtils";

export const PlayRandomWordle = () => {
  const [secretWord, setSecretWord] = useState("");
  const wordle = useMemo(() => new Wordle(secretWord), [secretWord]);

  useEffect(()=>{
    fetch("https://random-word-api.herokuapp.com/word?length=5&lang=ES")
    .then(res => res.json())
    .then(([data]) => setSecretWord(formatWord(data)))
    .catch(e => {console.log(e); setSecretWord("error")})
  }, [])


  if(wordle.getWordLength() < 1) return null

  return (
    <>
      <PlayWordle wordle={wordle}/>      
    </>
  )
}



export default PlayRandomWordle
