var config = require('./config.js');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db_path);
var inquirer = require('inquirer');
var VocAPI = require('voc-api');
var voc = new VocAPI();

db.serialize(() => {
    db.all("SELECT * FROM BOOK_INFO", (err, rows) => {
        listBooks(rows)
    })
})

function listBooks(books) {

    inquirer.prompt([{type: 'checkbox', message: "Upload lookup lists from these books:", name: "books",
        choices: books.map(b => { return         {
            name: b.title,
            value: b.id
        }
    }) }])
    .then((answers) => {
        answers.books.map(bookId => books.find(b => b.id == bookId)).forEach(uploadLookups);
        close();
    });
}

function uploadLookups(book) {
    // retrieve lookups with word info
    db.all("SELECT l.id as lookup_id, * \
            FROM LOOKUPS as l \
            JOIN WORDS as w ON w.id = l.word_key \
            WHERE book_key = ?", book.id, (err, answers) => {
        var wordList = answers.map( a => {
            return {
                word: a.word,
                example: a.usage
            }}
        ).filter( ({word}) => word && word.length > 1);

        //
        inquirer.prompt([{
            type: 'list',
            message: 'Upload all words from the book, or select them?',
            name: "selectChoice",
            choices: ["Select manually", "Upload all"]
        }]).then(answers => {
            console.log(answers);
            if (answers.selectChoice === 'Select manually') {
                const exampleCutoff = 100;

                inquirer.prompt([{
                    type: 'checkbox',
                    message: 'Select the words to upload',
                    name: "selectChoice",
                    // choices: wordList.map(({word, example}, i) => ({
                    //     name: `${word} (${example})`,
                    //     value: `${i}${word}` 
                    // })),
                    choices: wordList.map((wordObject) => ({
                        name: `${wordObject.word} - ${wordObject.example.slice(0, exampleCutoff)}${
                            wordObject.length > exampleCutoff ? "..." : ""}`,
                        value: wordObject,
                        checked: true,
                    }))
                }]).then(answers => addWordList(book, answers.selectChoice));
            } else {
                addWordList(book, wordList)
            }
        });


    })
}

function addWordList(book, wordList) {
    voc.login(config.voc_username, config.voc_password).then(() => {
        voc.addToNewList(wordList, book.title, "Vocabulary Builder list uploaded from Kindle with voc-uploader.", false)
        .then(console.log);
    });
}

function close() {
    db.close();
}
