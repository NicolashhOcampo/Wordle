import React, { useEffect, useRef, useState } from 'react'
import { Letter as L, Word } from '../types/word.type';
import { Wordle } from '../classes/Wordle';
import { InputWord } from './InputWord';
import { isAlphabet } from '../utils/stringUtils';
import { Modal } from './Modal';
import { Letter } from './Letter';
import backspaceIcon from "../assets/backspace.svg";

const initialKeyboardState = "qwertyuiopasdfghjklñzxcvbnm".split("").map(letter => ({
    letter,
    feedback: null
}));

export const PlayWordle = ({ wordle }: { wordle: Wordle }) => {


    const inputRef = useRef<HTMLInputElement | null>(null)
    const [activeWord, setActiveWord] = useState(0)
    const [words, setWords] = useState<Word[]>(
        Array.from({ length: 5 }, () => ({
            word: "",
            feedback: null
        }))
    );
    const [letters, setLetters] = useState<L[]>(initialKeyboardState);


    const row1 = letters.slice(0, 10);  // Q - P
    const row2 = letters.slice(10, 20); // A - L
    const row3 = letters.slice(20);     // Z - M

    const getAllFeedbacks = (words: Word[]) => {
        const feedbacks = words.map(word => word.feedback)
        console.log(feedbacks)
        return feedbacks.filter(feedback => feedback)
    }

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
    }, []);

    useEffect(() => {
        console.log(getAllFeedbacks(words))
    }, [words])

    const checkWord = () => {
           if (words[activeWord]?.word.length !== wordle?.getWordLength() || activeWord >= words.length) return

        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].feedback = wordle?.checkAnswer(newWords[activeWord].word) ?? []
            return newWords
        })
        setActiveWord(prev => prev + 1)
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newString = event.target.value.toUpperCase()
        if (!isAlphabet(newString) || activeWord >= words.length) return
        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].word = newString
            return newWords
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        checkWord()

    }

    const handleClickLetter = (l: string) => {
        const newString = words[activeWord]?.word + l.toUpperCase()
        if (!isAlphabet(newString) || newString.length > wordle.getWordLength() || activeWord >= words.length) return
        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].word = newString
            return newWords
        })
    }

    const handleClickBackSpace = () => {
        const newString = words[activeWord]?.word.slice(0, words[activeWord]?.word.length - 1) + ""
        if (!isAlphabet(newString) || newString.length > wordle.getWordLength() || activeWord >= words.length) return
        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].word = newString
            return newWords
        })
    }
    return (
        <>
            <div className="w-140 mx-auto border ">
                <form onSubmit={handleSubmit} action="submit">
                    <input className="border border-white text-white sr-only"
                        ref={inputRef}
                        type="text"
                        maxLength={wordle?.getWordLength() ?? 0}
                        value={words[activeWord]?.word ?? ""}
                        onChange={handleChangeInput}
                    />
                </form>

                <section className="flex flex-col gap-2 mt-30">
                    {words.map((word, index) => (
                        <InputWord key={index} word={word} length={wordle?.getWordLength() ?? 0} />
                    ))}

                </section>
                <section className='mt-20'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-1'>
                            {row1.map((letter) => {
                                return (
                                    <Letter onClick={() => handleClickLetter(letter.letter)} key={letter.letter} letter={letter} />
                                )
                            })}
                        </div>
                        <div className='flex gap-1'>
                            {row2.map((letter) => {
                                return (
                                    <Letter onClick={() => handleClickLetter(letter.letter)} key={letter.letter} letter={letter} />
                                )
                            })}
                        </div>
                        <div className='flex gap-1'>
                            <div onClick={handleClickBackSpace} className={`flex-[1.5] cursor-pointer h-12 border-2 rounded-xl border-gray-600 flex items-center justify-center transition-all ease-out duration-300`}>
                                <img src={backspaceIcon} alt="Backspace" className="h-6" />
                            </div>
                            {row3.map((letter) => {
                                return (
                                    <Letter onClick={() => handleClickLetter(letter.letter)} key={letter.letter} letter={letter} />
                                )
                            })}
                            <div onClick={checkWord} className={`flex-[1.5] cursor-pointer h-12 border-2 rounded-xl border-gray-600 flex items-center justify-center transition-all ease-out duration-300`}>
                                <span className="text-xl font-semibold text-white">ENTER</span>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            {/* <Modal word='TOMAR' feedbacks={getAllFeedbacks(words)}/> */}
        </>
    )
}

