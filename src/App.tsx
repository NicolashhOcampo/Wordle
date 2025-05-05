import React, { useEffect, useMemo, useRef, useState } from "react"
import { InputWord } from "./components/InputWord"
import { Word } from "./types/word.type"
import { Wordle } from "./classes/Wordle";
import { CreateWordle } from "./components/CreateWordle";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [secretWord, setSecretWord] = useState("aeiou");
  const wordle = useMemo(() => new Wordle(secretWord), [secretWord]);
  const [words, setWords] = useState<Word[]>(
    Array.from({ length: 5 }, () => ({
      word: "",
      feedback: null
    }))
  );
  const [activeWord, setActiveWord] = useState(0)

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
  
    document.addEventListener("click", handleClick);
  
    inputRef.current?.focus();
  
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [secretWord]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newString = event.target.value.toUpperCase()
    if (!isAlphabet(newString)) return
    setWords(prev => {
      const newWords = [...prev]
      newWords[activeWord].word = newString
      return newWords
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (words[activeWord].word.length !== wordle.getWordLength()) return

    setWords(prev => {
      const newWords = [...prev]
      newWords[activeWord].feedback = wordle.checkAnswer(newWords[activeWord].word)
      return newWords
    })   
    if (activeWord < words.length - 1){
      setActiveWord(prev => prev + 1)
    }
    
  }

  if (wordle.getWordLength() === 0){
    return(
      <div className="w-full h-full flex justify-center items-center">
        <CreateWordle setWord={setSecretWord}/>
      </div>
    )
  }

  return (
    <>
      <div className="w-120 mx-auto border ">
        <form onSubmit={handleSubmit} action="submit">
          <input className="border border-white text-white sr-only"
            ref={inputRef}
            type="text"
            maxLength={wordle.getWordLength()}
            value={words[activeWord].word}
            onChange={handleChangeInput}
          />
        </form>

        <section className="flex flex-col gap-2 mt-30">
          {words.map((word, index) => (
            <InputWord key={index} word={word} length={wordle.getWordLength()}/>
          ))}

        </section>
      </div>
    </>
  )
}

export function isAlphabet(str: string) {
  return /^([a-zA-Z]*)$/.test(str);
}

export default App
