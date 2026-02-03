import { Word } from "../types/word.type"
import { FlipLetter } from "./FlipLetter"

export const InputWord = ({ word, length }: { word: Word, length: number }) => {

  const formatValue = word.word.padEnd(length, " ").toUpperCase()
  return (
    <div className="w-full flex justify-center gap-1 text-white">
      {formatValue.split("").map((l, index) => (
        <FlipLetter key={index} letter={l} feedback={word.feedback?.[index]} delay={index * 100} />
      ))}
    </div>
  )
}
