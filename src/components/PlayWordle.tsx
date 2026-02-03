import { useCallback, useEffect, useState } from 'react'
import { Letter as L, Word } from '../types/word.type';
import { Wordle } from '../classes/Wordle';
import { InputWord } from './InputWord';
import { isAlphabet } from '../utils/stringUtils';
import { Letter } from './Letter';
import backspaceIcon from "../assets/backspace.svg";
import { GameStatus } from '../types/gameStatus.type';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Modal } from './Modal';


const keyBoardLetters = "qwertyuiopasdfghjklñzxcvbnm"

export const PlayWordle = ({ wordle, listWords }: { wordle: Wordle, listWords?: string[] }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const initialKeyboardState = keyBoardLetters.split("").map(letter => ({
        letter: letter.toUpperCase(),
        feedback: null
    }));

    const [gameStatus, setGameStatus] = useState<GameStatus>("IN_GAME")
    const [activeWord, setActiveWord] = useState(0)
    const [words, setWords] = useState<Word[]>(
        Array.from({ length: 6 }, () => ({
            word: "",
            feedback: null
        }))
    );
    const [letters, setLetters] = useState<L[]>(initialKeyboardState);


    const row1 = letters.slice(0, 10);  // Q - P
    const row2 = letters.slice(10, 20); // A - L
    const row3 = letters.slice(20);     // Z - M

    const checkWord = () => {
        if (gameStatus !== "IN_GAME" || words[activeWord]?.word.length !== wordle?.getWordLength() || activeWord >= words.length) return

        if (listWords && !listWords.includes(words[activeWord].word.toLowerCase())) {
            toast("Palabra no valida")
            return
        }

        const [isCorrect, newFeedback] = wordle?.checkAnswer(words[activeWord].word) || [false, null]
        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].feedback = newFeedback ?? null
            return newWords
        })

        const newLetters = [...letters]

        newFeedback?.forEach((feedback, index) => {
            if (feedback == "match") {
                const letterIndex = newLetters.findIndex(letter => letter.letter.toUpperCase() === words[activeWord].word[index].toUpperCase())
                newLetters[letterIndex].feedback = "match"
            } else {
                const letterIndex = newLetters.findIndex(letter => letter.letter === words[activeWord].word[index])
                if (!newLetters[letterIndex].feedback) {
                    newLetters[letterIndex].feedback = feedback
                }
            }
        })

        setLetters(newLetters)

        if (isCorrect) {
            setGameStatus("WIN")
            console.log("ganaste")

            setTimeout(() => {
                toast("GANASTE!")
                setModalOpen(true);
            }, 1000);
            return
        }

        const nextIndex = activeWord + 1
        if (nextIndex >= words.length) {
            setGameStatus("LOSE")

            setTimeout(() => {
                toast(`Perdiste: ${wordle.getWord()}`)
                setModalOpen(true);
            }, 1000);
        }

        setActiveWord(nextIndex)
    }

    const handleClickBackSpace = () => {
        const newString = words[activeWord]?.word.slice(0, words[activeWord]?.word.length - 1) + ""
        if (gameStatus !== "IN_GAME" || !isAlphabet(newString) || newString.length > wordle.getWordLength() || activeWord >= words.length) return

        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].word = newString
            return newWords
        })
    }

    const handleClickLetter = (l: string) => {
        const newString = words[activeWord]?.word + l.toUpperCase()
        if (gameStatus !== "IN_GAME" || !isAlphabet(newString) || newString.length > wordle.getWordLength() || activeWord >= words.length) return

        setWords(prev => {
            const newWords = [...prev]
            newWords[activeWord].word = newString
            return newWords
        })
    }

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (gameStatus !== "IN_GAME") return;

        const key = e.key.toUpperCase();
        if (key === "BACKSPACE") {
            handleClickBackSpace();
        } else if (key === "ENTER") {
            checkWord();
        } else if (key.length === 1 && isAlphabet(key)) {
            handleClickLetter(key);
        }
    }, [gameStatus, activeWord, words, letters]); // Added dependencies to ensure the function is updated correctly


    useEffect(() => {

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <div className="w-full h-full m-auto py-5 mx-auto border flex flex-col justify-between items-center">

                <section className="w-full flex flex-col gap-2">
                    {words.map((word, index) => (
                        <InputWord key={index} word={word} length={wordle?.getWordLength() ?? 0} />
                    ))}

                </section>
                <section className='w-full'>
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
                            <div onClick={handleClickBackSpace} className={`flex-[1.5] cursor-pointer h-12 border-2 rounded-xs border-gray-500 bg-gray-500 flex items-center justify-center transition-all ease-out duration-300`}>
                                <img src={backspaceIcon} alt="Backspace" className="h-6" />
                            </div>
                            {row3.map((letter) => {
                                return (
                                    <Letter onClick={() => handleClickLetter(letter.letter)} key={letter.letter} letter={letter} />
                                )
                            })}
                            <div onClick={checkWord} className={`flex-[1.5] cursor-pointer h-12 border-2 rounded-xs border-gray-500 bg-gray-500 flex items-center justify-center transition-all ease-out duration-300`}>
                                <span className="text-xl font-semibold text-white">ENTER</span>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            {modalOpen && <Modal correctWord={wordle.getWord()} words={words} onClose={() => setModalOpen(false)} />}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </>
    )
}

