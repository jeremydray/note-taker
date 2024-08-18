const { readFromFile,
    writeToFile,
    readAndAppend } = require('./helpers/utils')
const notes = require('./db/db.json')
const express = require('express');
const path = require('path');
const util = require('util');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    notesFile = res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(notes)
    console.log(`${req.method} request received!`)
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
        }

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    };
})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);



