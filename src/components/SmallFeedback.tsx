import { Word } from '../types/word.type'


export const SmallFeedback = ({ word }: { word: Word }) => {

    return (
        <div className='flex gap-1'>
            {
                word.feedback?.map((feedback, index) => {
                    const bg = !feedback ? "" : feedback === "match" ? " bg-green-600 border-green-600" : feedback === "misplaced" ? " bg-yellow-500 border-yellow-500" : " bg-gray-800 border-gray-800"
                    return (
                    <div key={index} className={`border-2 size-5 rounded-md ${bg}`}>
                    </div>
                )})
            }
        </div>

    )
}
