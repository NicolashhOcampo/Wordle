export function isAlphabet(str: string) {
    return /^([a-zA-ZñÑ]*)$/.test(str);
}

export function formatWord(word: string) {
    // Elimina acentos, convierte a minúsculas y recorta espacios
    return word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // elimina diacríticos
        .toLowerCase()
        .trim();
}