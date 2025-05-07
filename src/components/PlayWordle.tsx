import React, { useEffect, useRef, useState } from 'react'
import { Word } from '../types/word.type';
import { Wordle } from '../classes/Wordle';
import { InputWord } from './InputWord';
import { useNavigate, useParams } from 'react-router';
import { isAlphabet } from '../utils/stringUtils';

export const PlayWordle = () => {
    const [wordle, setWordle] = useState<Wordle | null>(null)
    const {word} = useParams()
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [activeWord, setActiveWord] = useState(0)
    const [words, setWords] = useState<Word[]>(
        Array.from({ length: 5 }, () => ({
            word: "",
            feedback: null
        }))
    );

    useEffect(() => {
        if(!word || word.length < 1 || !isAlphabet(word)) {
            console.log("No hay")
            navigate("/create")
            return
        }
        setWordle(new Wordle(word)) 

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
    }, []);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newString = event.target.value.toUpperCase()
        if (!isAlphabet(newString)) return
        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].word = newString
            return newWords
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (words[activeWord].word.length !== wordle?.getWordLength()) return

        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].feedback = wordle?.checkAnswer(newWords[activeWord].word) ?? []
            return newWords
        })
        if (activeWord < words.length - 1) {
            setActiveWord(prev => prev + 1)
        }

    }
    return (
        <>
            <div className="w-120 mx-auto border ">
                <form onSubmit={handleSubmit} action="submit">
                    <input className="border border-white text-white sr-only"
                        ref={inputRef}
                        type="text"
                        maxLength={wordle?.getWordLength() ?? 0}
                        value={words[activeWord].word}
                        onChange={handleChangeInput}
                    />
                </form>

                <section className="flex flex-col gap-2 mt-30">
                    {words.map((word, index) => (
                        <InputWord key={index} word={word} length={wordle?.getWordLength() ?? 0} />
                    ))}

                </section>
            </div>
        </>
    )
}

