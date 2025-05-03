import { Word } from "../types/word.type"

export const InputWord = ({word}:{word:Word}) => {

  const formatValue = word.word.padEnd(5, " ").toUpperCase()
  return (
    <div className="mx-auto flex justify-center gap-1 text-white">
        {formatValue.split("").map((l, index) => {
          const bg = !word.feedback? "" : word.feedback[index] === "match"? "bg-green-600" : word.feedback[index] === "misplaced"? "bg-yellow-500" : "bg-gray-600"
          return (
            <div key={index}
            className={"size-15 border-2 rounded-xl border-gray-600 text-5xl flex items-center justify-center " + bg}
            ><span className="font-semibold">{l.toUpperCase()}</span></div>
        )})}
    </div>
  )
}
