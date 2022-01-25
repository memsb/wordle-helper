# wordle-helper

## Installation
Best run using [ts-node](https://www.npmjs.com/package/ts-node)

```npm install```

## Running the helper

```ts-node helper.ts```

Inputting guesses filters the words suggested. Guesses are to be entered using a ? after the letter to indicate it is in the word, and ! to indicate it is in the correct position.

![Wordle Guess](https://raw.githubusercontent.com/memsb/wordle-helper/main/screenshots/guess.png)

Would be input as la?ter!

![Suggested words](https://raw.githubusercontent.com/memsb/wordle-helper/main/screenshots/running.png)

## Changing the Words List
Running the script ```ts-node prepare_words_list.ts``` will analyse the list of words in `data/input.txt` sorting them and outputting them to `data/sorted_words.txt` to be used by the helper program.

The words are sorted according to how many unique commonly used letters each contains. Letter frequencies are generated be analysing the words list, then each word is scored and sorted accordingly.

There are 2 word lists available to choose from and custom words lists can be added to the /data folder.