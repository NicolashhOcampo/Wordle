import { FeedBack } from "../types/word.type";

interface FlipLetterProps {
    letter: string;
    feedback: FeedBack | undefined;
    delay: number;
}

export const FlipLetter = ({ letter, feedback, delay }: FlipLetterProps) => {
    const hasText = letter.trim().length > 0
    const bg = !feedback ? "" : feedback === "match" ? " bg-green-600 border-green-600" : feedback === "misplaced" ? " bg-yellow-500 border-yellow-500" : " bg-gray-700 border-gray-700";

    return (
        <div className={`${hasText ? "animate-pop-letter" : ""} md:size-15 size-12 perspective-midrange`}>
            <div className={`relative w-full h-full transition-transform duration-600 transform-3d ${feedback ? "-rotate-x-180" : ""}`}
                style={{ transitionDelay: `${delay}ms` }}
            >

                <div className="absolute w-full h-full border border-gray-500 text-white flex items-center justify-center md:text-4xl text-3xl font-bold backface-hidden">
                    {letter.toUpperCase()}
                </div>

                <div className={`absolute w-full h-full ${bg} text-white flex items-center justify-center md:text-4xl text-3xl font-bold rotate-x-180 backface-hidden`}>
                    {letter.toUpperCase()}
                </div>
            </div>
        </div>
    )
}
