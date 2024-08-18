const { readFromFile,
    writeToFile,
    readAndAppend } = require('./helpers/utils')
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    notesFile = res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    console.log(req.body);

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    };
})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);



