import * as fs from 'fs';

const get_words = (): string[] => {
    return fs.readFileSync('data/answers.txt', 'utf8').split("\n");
}

const save_words = (words: string[]) => {
    fs.writeFileSync('data/sorted_words.txt', words.join("\n"))
}

const get_letter_frequencies = (words: string[]): string[] => {
    const freq: Map<string, number> = new Map();
    words.forEach((word: string) => {
        let letters: string[] = word.split('');
        letters.forEach((letter: string) => {
            let value: number = freq.get(letter) || 1;
            freq.set(letter, value + 1);
        })
    });

    return [...freq.entries()]
        .sort((left, right) => left[1] > right[1] ? 1 : -1)
        .map((letter_count) => letter_count[0]);
}

const unique = (letters: string[]): string[] => {
    return letters.filter((item, index) => letters.indexOf(item) === index);
}

const get_word_value = (word: string, letter_frequency: string[]): number => {
    let letters: string[] = unique(word.split(''));
    return letters.reduce((value: number, letter: string): number => {
        return value + letter_frequency.indexOf(letter);
    }, 0);
}

const order_by_value = (words: string[]): string[] => {
    let freq = get_letter_frequencies(words);

    return words.sort((left: string, right: string): number => get_word_value(right, freq) - get_word_value(left, freq));
}

let words = get_words();
let ordered_words = order_by_value(words);
save_words(ordered_words);

console.log(`${words.length} ordered by value.`);
