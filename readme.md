# Voc Uploader

A simple CLI app to upload the dictionary lookups from an Amazon Kindle for a particular book to a vocabulary.com list. Makes it eaier to centralize your word-learning to vocabulary.com.

For everyone who thinks [learning words on a Kindle device](https://www.dummies.com/consumer-electronics/tablets/kindle/how-to-use-vocabulary-builder-on-your-kindle-paperwhite/) is not the best way. This app joins [a range](https://github.com/search?p=1&q=kindle+vocabulary&type=Repositories) of other projects that do the same for other vocabulary services ([Memrise](https://github.com/jaroslawhartman/kindle-to-memrise), [ANKI](https://github.com/NdYAG/Kindle2Anki)), ...

Currently only in a proof-of-concept state...

## Installation

Until I publish Vocabulary API in an npm repository, you'll need to do some configuration work yourself to integrate the voc-api dependency. Contact me if you want to use this project & need help.

1. Clone the repo
2. Edit the path of `voc-api` in in the `dependencies` of `package.json` to match a local folder where you installed the voc-api module.
3. Install the module
    ```
    yarn // or npm install
    ```
4. Create a file `config.js` in the repo with the following content:
    ```
    module.exports = {
        voc_username: "<your vocabulary.com username>",
        voc_password: "<your vocabulary.com password>",
        db_path: "<path to your Kindle's vocab.db file>"
    };
    ```
## Usage

```node index.js```
An interactive CLI will guide you through the process of uploading a list for a book.

## TODO

- [] Interactive Kindle device handling (plug & play, no explicit vocab.db reference)
- [] A GUI to (de)select unintended words at upload time.
- [] Testing/support for more e-readers with this function