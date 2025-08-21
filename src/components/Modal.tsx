import { Word } from "../types/word.type"
import { SmallFeedback } from "./SmallFeedback"

interface ModalProps {
  correctWord: string,
  words: Word[],
  onClose: () => void
}

export const Modal = ({ correctWord, words, onClose }: ModalProps) => {



  return (

    <div className="fixed top-0 left-0 w-dvw h-dvh bg-black/40 flex items-center justify-center">
      <div className="w-70 h-80 rounded-2xl bg-gray-700 p-2 flex flex-col items-center">
        <div className="w-full flex justify-end">
          <button type="button" onClick={onClose} className="text-white p-3 size-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-600">X</button>
        </div>
        <h2 className="text-white text-2xl font-bold">WORDLE</h2>
        <p className="text-gray-300 text-lg mt-2">Palabra: <span className="font-semibold">{correctWord}</span></p>
        <div className="flex flex-col gap-2 mt-8">
          {words.map((word, index) => (
            <SmallFeedback key={index} word={word} />
          ))}
        </div>
      </div>
    </div>
  )
}
