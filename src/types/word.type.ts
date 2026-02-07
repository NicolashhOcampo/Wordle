export type FeedBack = "match" | "misplaced" | "wrong";

export interface Word {
    word: string,
    feedback: null | FeedBack[]
}

export interface Letter {
    text: string,
    feedback: null | FeedBack
}