import { useState } from "react"
import { isAlphabet } from "../App"

export const CreateWordle = ({ setWord }: { setWord: (newWord: string) => void }) => {
    const [inputValue, setInputValue] = useState("")

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newString = event.target.value.toUpperCase()
        if (!isAlphabet(newString)) return
        setInputValue(newString)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isAlphabet(inputValue)) return

        setWord(inputValue)
    }

    return (
        <div className="w-120 mx-auto border bg-gray-600 rounded-xl p-4">
            <h2 className="text-center text-white text-2xl font-semibold uppercase">Ingrese una palabra para jugar</h2>
            <form className="mt-5 flex flex-col items-center gap-2" action="" onSubmit={handleSubmit}>
                <input 
                type="text" 
                value={inputValue} 
                maxLength={8}
                onChange={handleChangeInput}
                className="border text-white rounded-2xl w-6/10 h-10 pl-2 text-xl" />
                <button type="submit"
                    className="mt-8 border text-white rounded-2xl bg-green-500 w-30 h-10 cursor-pointer"
                >JUGAR!</button>
            </form>
        </div>

    )
}
