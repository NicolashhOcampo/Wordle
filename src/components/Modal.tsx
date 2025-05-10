import { FeedBack } from "../types/word.type"

export const Modal = ({word, feedbacks}:{word:string, feedbacks:FeedBack[][]}) => {
  return (
    <div className="z-10 absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-70 h-50 flex flex-col pt-3 items-center bg-gray-700 rounded-3xl">
            <h2 className="text-white text-2xl">GANASTE!</h2>
            <span className="text-white text-2xl mt-2">{word}</span>

            <div>

            </div>
        </div>
    </div>
  )
}
