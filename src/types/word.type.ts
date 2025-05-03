export type FeedBack = "match" | "misplaced" | "wrong";

export interface Word {
    word: string,
    feedback: null | FeedBack[]
}