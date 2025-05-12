import { Letter as L } from '../types/word.type'

export const Letter = ({letter, onClick}:{letter:L, onClick: () => void}) => {

  const bg = !letter.feedback? "bg-gray-500" : letter.feedback === "match"? " bg-green-600 border-green-600" : letter.feedback === "misplaced"? " bg-yellow-500 border-yellow-500" : " bg-gray-700 border-gray-700"
  return (
    <div onClick={onClick} className={`flex-1 h-12 cursor-pointer border-2 rounded-xl border-gray-600 flex items-center justify-center transition-all ease-out duration-300 ${bg}`}>
      <span className="text-3xl font-semibold text-white">{letter.letter.toUpperCase()}</span>
    </div>
  )
}
