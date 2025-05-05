import { FeedBack } from "../types/word.type";

export class Wordle {
    private word:string

    constructor(word:string) {
        this.word = word.toUpperCase();
    }

    getWordLength(){
        return this.word.length
    }

    setWord(newWord:string){
        this.word = newWord
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
        console.log("feedback antes: ", feedback)
        feedback.forEach((f, index) => {
            if(f === "misplaced"){
                if(copy_word_list.includes(inputWord[index])){
                    console.log("letra: ", inputWord[index])
                    const indexLetter = copy_word_list.findIndex((letter)=>(letter === inputWord[index]))
                    copy_word_list[indexLetter] = "-"
                }else{
                    feedback[index] = "wrong"
                }
            }
        })

        return feedback
    }
}