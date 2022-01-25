import * as fs from 'fs';
import reader from "readline-sync";

const tokenise = (word: string): string[] => {
    return word.split('').reduce((prev: string[], current: string): string[] => {
        if (['?', '!'].includes(current)) {
            let last = prev.pop()
            current = `${last}${current}`
        }
        prev.push(current);
        return prev;
    }, [])
}

const filterByGuess = (guess: string, words: string[]): string[] => {
    let tokens = tokenise(guess);
    tokens.forEach((token, pos) => {
        let [letter, symbol] = token.split('');
        if (symbol === '!') {
            words = words.filter(by_correct(letter, pos));
        } else if (symbol === '?') {
            words = words.filter(by_includes(letter, pos));
        } else {
            words = words.filter(by_incorrect(letter));
        }
    });

    return words;
}

const get_words = (): string[] => {
    return fs.readFileSync('data/sorted_words.txt', 'utf8').split("\n");
}

const by_incorrect = (letter: string) => {
    return (word: string): boolean => !word.includes(letter);
};

const by_correct = (letter: string, position: number) => {
    return (word: string): boolean => word.charAt(position) == letter;
};

const by_includes = (letter: string, position: number) => {
    return (word: string): boolean => word.includes(letter) && word.indexOf(letter) !== position;
};

let words = get_words();
console.log('Good starting words:')
console.log(words.slice(0, 20).join(' '));

while (words.length > 1) {
    console.log("\n");
    const guess = reader.question("Guess: ");
    words = filterByGuess(guess, words)

    console.log("\n");
    console.log(`${words.length} matching words: `)
    console.log(words.slice(0, 20).join(' '));
}