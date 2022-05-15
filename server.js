// import dependencies
const express = require('express');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');

// config
const PORT = process.env.PORT || 3001;

// wrapper
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// send GET requests
app.get('/', (req,res) => {
    // Send file 'notes.html'
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
    // Send file 'notes.html'
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    // Send file 'notes.html'
    res.sendFile(path.join(__dirname, './db/db.json'));
});

// send POST request
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    let notesDb = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));

    const { title, text } = req.body;

    if (title && text) {
        const note = { title, text, id: uuidv4(), };

        notesDb.push(note);
        const allNotes = JSON.stringify(notesDb, null, 4)

        fs.writeFileSync('./db/db.json', allNotes, 'utf8', (err) => 
            err
                ? console.err(err)
                : console.log("Note created")
        );

        const response = {
            status: 'success',
            body: note,
        };

        res.status(201).json(response);

    } else {
        res.status(500).json("Error: Please check connection and retry.")
    }
});

app.listen(PORT, () => 
    console.log(`Note Taker v1 listening at http://localhost:${PORT}`)
);

// Bonus credit for delete note functionality