import { useState } from "react"
import { useNavigate } from "react-router";
import { isAlphabet } from "../utils/stringUtils";

export const CreateWordle = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("")

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newString = event.target.value.toUpperCase()
        if (!isAlphabet(newString)) return
        setInputValue(newString)
    }

    const handlePlay = () => {

        if (!isAlphabet(inputValue)) return

        navigate(`/playCustom/${inputValue}`)
    }

    const handleCreateLink = ()=>{
        console.log("Link creado")
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
        <div className="w-80 h-80 flex flex-col justify-center mx-auto border bg-gray-600 rounded-xl p-4">
            <h2 className="text-center text-white text-2xl font-semibold uppercase">Ingrese una palabra</h2>
            
            <div className="mt-auto flex flex-col items-center gap-2">
                <p className="mt-8 text-center text-white">Maximos de 8 letras</p>
                <input 
                type="text" 
                value={inputValue} 
                maxLength={8}
                onChange={handleChangeInput}
                className="border-2 text-white rounded-2xl bg-gray-700 w-6/10 h-10 pl-3 text-xl focus:border-green-700 focus:outline-none transition-colors duration-300" />
                <button
                    onClick={handlePlay}
                    className="mt-8 border text-white rounded-2xl bg-green-500 w-30 h-10 cursor-pointer"
                >JUGAR!</button>

                <div className="w-full flex items-center gap-1">
                    <div className="flex-1 h-0.25 bg-white" />
                    <span className="text-white">O</span>
                    <div className="flex-1 h-0.25 bg-white" />
                </div>

                <button
                    onClick={handleCreateLink}
                    className="border text-white rounded-2xl bg-blue-500 w-30 h-10 cursor-pointer"
                >Generar Link</button>
            </div>
        </div>
        </div>
    )
}
