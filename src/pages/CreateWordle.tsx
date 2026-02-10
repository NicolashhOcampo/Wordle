import { useState } from "react"
import { useNavigate } from "react-router";
import { isAlphabet } from "../utils/stringUtils";
import { vigenere } from "../utils/vigenere";
import { Bounce, toast, ToastContainer } from "react-toastify";
import words from "an-array-of-spanish-words"
const secretKey: string = import.meta.env.VITE_SECRET_KEY;
const base_url: string = import.meta.env.VITE_BASE_URL
export const CreateWordle = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("")
    const [link, setLink] = useState("")

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newString = event.target.value.toUpperCase()
        if (!isAlphabet(newString)) return
        setInputValue(newString)
    }

    const handlePlay = () => {

        if (!words.includes(inputValue.toLowerCase())) {
            toast.error("Palabra no valida")
            return
        }


        navigate(`/playCustom/${vigenere(inputValue, secretKey)}`)
    }

    const handleCreateLink = async () => {
        if (!words.includes(inputValue.toLowerCase())) {
            toast.error("Palabra no valida")
            return
        }

        try {
            await navigator.clipboard.writeText(`${base_url}/playCustom/${vigenere(inputValue, secretKey)}`)
            setLink(`${base_url}/playCustom/${vigenere(inputValue, secretKey)}`)
            toast.success("Link copiado en el portapeles!")
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-80 flex flex-col justify-center mx-auto border bg-gray-600 rounded-xl p-4">
                <h2 className="text-center text-white text-2xl font-semibold uppercase">Ingrese una palabra</h2>

                <div className="mt-auto flex flex-col items-center gap-2">
                    <p className="mt-8 text-center text-white">Máximo de 8 letras</p>
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
                    <p className="text-white">{link}</p>
                </div>
            </div>
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
        </div>
    )
}
