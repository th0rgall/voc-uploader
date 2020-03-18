# Voc Uploader

A simple CLI app to upload the dictionary lookups from an Amazon Kindle for a particular book to a vocabulary.com list. Makes it eaier to centralize your word learning to vocabulary.com.

For everyone who thinks [learning words on a Kindle device](https://www.dummies.com/consumer-electronics/tablets/kindle/how-to-use-vocabulary-builder-on-your-kindle-paperwhite/) is not the best way. This app joins [a range](https://github.com/search?p=1&q=kindle+vocabulary&type=Repositories) of other projects that do the same for other vocabulary services ([Memrise](https://github.com/jaroslawhartman/kindle-to-memrise), [ANKI](https://github.com/NdYAG/Kindle2Anki)), ...

Currently in a proof-of-concept state.

## Installation

1. Clone the repo
2. Connect your Kindle via USB. Locate your `vocab.db` file, making sure that you can see hidden files in your file manager. On my macOS system it's in `/Volumes/Kindle/system/vocabulary/vocab.db`
3. Copy `vocab.db` to somewhere on your file location (so you don't mess with the original).
4. Create a file `config.js` in the repo with the following content:
   ```
   module.exports = {
       voc_username: "<your vocabulary.com username>",
       voc_password: "<your vocabulary.com password>",
       db_path: "<path to your Kindle's vocab.db file>"
   };
   ```
   Note: for now you need to create an explicit password for your account if you only used OAuth login before (eg. Google). A way to support any vocabulary.com login is in the works.

## Usage

Run `node index.js`
An interactive CLI will guide you through the process of uploading a list for a book.

## TODO

- [ ] Interactive Kindle device handling (plug & play, no explicit vocab.db reference)
- [ ] A GUI to (de)select unintended words at upload time.
- [ ] Testing/support for more e-readers with this function
