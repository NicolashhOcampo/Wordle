import { FeedBack } from "../types/word.type";

export class Wordle {
    word:string

    constructor(word:string) {
        this.word = word.toUpperCase();
    }

    checkAnswer(inputWord:string):FeedBack[] | null {
        if(this.word.length !== inputWord.length){
            return null
        }

        if(this.word.toUpperCase() === inputWord.toUpperCase()) {
            return Array.from({length: this.word.length}, () => "match")
        }

        const copy_word_list = this.word.toUpperCase().split("")
        let feedback:FeedBack[] = []

        inputWord.toUpperCase().split("").forEach((letter, index) => {
            if (!(copy_word_list.includes(letter))){
                feedback.push("wrong")
            }else if (letter === copy_word_list[index]){
                feedback.push("match")
                copy_word_list[index] = "-"
            }else{
                feedback.push("misplaced")
            }
        })

        feedback.forEach((f, index) => {
            if(f === "misplaced"){
                if(copy_word_list.includes(inputWord[index])){
                    copy_word_list[index] = "-"
                }else{
                    feedback[index] = "wrong"
                }
            }
        })

        return feedback
    }
}