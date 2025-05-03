import React, { useEffect, useState } from "react"
import { InputWord } from "./components/InputWord"
import { Word } from "./types/word.type"
import { Wordle } from "./classes/Wordle";

const wordle = new Wordle("SaLas")
function App() {
  const [words, setWords] = useState<Word[]>(
    Array.from({ length: 5 }, () => ({
      word: "",
      feedback: null
    }))
  );
  const [activeWord, setActiveWord] = useState(0)

  useEffect(()=>{
    
    
  }, [])

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
    if (words[activeWord].word.length !== 5) return

    setWords(prev => {
      const newWords = [...prev]
      newWords[activeWord].feedback = wordle.checkAnswer(newWords[activeWord].word)
      return newWords
    })   
    if (activeWord < words.length - 1){
      setActiveWord(prev => prev + 1)
    }
    
  }
  return (
    <>
      <div className="w-120 mx-auto border ">
        <form onSubmit={handleSubmit} action="submit">
          <input className="border border-white text-white"
            type="text"
            maxLength={5}
            value={words[activeWord].word}
            onChange={handleChangeInput}
          />
        </form>

        <section className="flex flex-col gap-2 mt-30">
          {words.map((word, index) => (
            <InputWord key={index} word={word} />
          ))}

        </section>
      </div>
    </>
  )
}

function isAlphabet(str: string) {
  return /^([a-zA-Z]*)$/.test(str);
}

export default App
