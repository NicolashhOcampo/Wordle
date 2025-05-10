import React, { useEffect, useRef, useState } from 'react'
import { Word } from '../types/word.type';
import { Wordle } from '../classes/Wordle';
import { InputWord } from './InputWord';
import { isAlphabet } from '../utils/stringUtils';
import { Modal } from './Modal';

export const PlayWordle = ({wordle}:{wordle:Wordle}) => {


    const inputRef = useRef<HTMLInputElement | null>(null)
    const [activeWord, setActiveWord] = useState(0)
    const [words, setWords] = useState<Word[]>(
        Array.from({ length: 5 }, () => ({
            word: "",
            feedback: null
        }))
    );

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

    useEffect(()=>{
         console.log(getAllFeedbacks(words))
    }, [words])

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
            {/* <Modal word='TOMAR' feedbacks={getAllFeedbacks(words)}/> */}
        </>
    )
}

