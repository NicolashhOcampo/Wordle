import { isAlphabet } from "./stringUtils"

export function vigenere(message: string, key: string, direction = 1) {
    let key_index = 0
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let final_message = ""

    for (let char of message.toLowerCase()) {
        if (!isAlphabet(char)) {
            final_message += char
        } else {
            const key_char = key[key_index % key.length].toLowerCase()
            key_index++

            const offset = alphabet.indexOf(key_char)
            const index = alphabet.indexOf(char)
            const new_index = (index + offset * direction + alphabet.length) % alphabet.length

            final_message += alphabet[new_index]
        }
    }

    return final_message
}
