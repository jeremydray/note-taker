//Imports Setup
const { readFromFile,
    writeToFile,
    readAndAppend } = require('./helpers/utils')
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));// refer to 'public' folder first


//App Specifc Routes

//Direct index.html to notes.html page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//List the existing or modified list of notes
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});

//Create new notes ()
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    // console.log(req.body);

    if (title && text) {
        const newNote = {
            title: title,
            text: text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');
        res.json(`Success`);
    } else {
        res.json('Error, notes need both Title and Text.')
    }
})

//Delete notes from list when button is pressed
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    // console.log(noteId)
    readFromFile('./db/db.json')
        .then((details) =>
            JSON.parse(details))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            // console.log(result)
            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

//Catch all for any other requests
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


//Internal testing port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);


