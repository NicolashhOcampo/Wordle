import { Word } from "../types/word.type"

export const InputWord = ({word, length}:{word:Word, length:number}) => {

  const formatValue = word.word.padEnd(length, " ").toUpperCase()
  return (
    <div className="w-full flex justify-center gap-1 text-white">
        {formatValue.split("").map((l, index) => {
          const bg = !word.feedback? "" : word.feedback[index] === "match"? " bg-green-600 border-green-600" : word.feedback[index] === "misplaced"? " bg-yellow-500 border-yellow-500" : " bg-gray-700 border-gray-700"
          return (
            <div key={index}
            className={"md:size-15 size-12 border-2 rounded-xl border-gray-600 md:text-4xl text-3xl flex items-center justify-center transition-all ease-out duration-300" + bg}
            ><span className="font-semibold">{l.toUpperCase()}</span></div>
        )})}
    </div>
  )
}
