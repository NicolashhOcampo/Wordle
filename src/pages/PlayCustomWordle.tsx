import { useNavigate, useParams } from 'react-router'
import { Wordle } from '../classes/Wordle'
import { PlayWordle } from '../components/PlayWordle'
import { useEffect, useState } from 'react'
import { isAlphabet } from '../utils/stringUtils'
import { vigenere } from '../utils/vigenere'
import words from "an-array-of-spanish-words"
const secretKey: string = import.meta.env.VITE_SECRET_KEY;

export const PlayCustomWordle = () => {
    const [wordle, setWordle] = useState<Wordle | null>(null)
    const { word } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!word) {
            navigate("/create")
            return
        }
        const decryptedWord = vigenere(word, secretKey, -1)

        if (decryptedWord.length < 1 || !isAlphabet(decryptedWord) || !words.includes(decryptedWord.toLowerCase())) {
            navigate("/create")
            return
        }
        setWordle(new Wordle(decryptedWord))

    }, []);

    return (
        <PlayWordle wordle={wordle ?? new Wordle("Error")} listWords={words.filter(word => word.length === wordle?.getWordLength())} />
    )
}
