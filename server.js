// import dependencies
const express = require('express');
const {v4: uuid} = require('uuid');
const path = require('path');
const fs = require('fs');
// const { json } = require('express/lib/response');

// config
const PORT = process.env.PORT || 3001;

// wrapper
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// send GET request
app.get('/notes', (req,res) => {
    // Send file 'notes.html'
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req,res) => {
    // Send file 'notes.html'
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req,res) => {
    // Send file 'notes.html'
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// send POST request
app.post('/api/notes', (res,req) => {
    // Create (persist) data
    // Access new note data from request
    fs.readFileSync(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) {
            throw err;
        } else {
            // Push it to my existing list of notes
            var note = JSON.parse(data);
            note.push({...req.body, id: uuidv4()});
            fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(note));
        }
    });
    // Write my updates note list to the `db.json` file
});

app.listen(PORT, () => 
    console.log(`Note Taker v1 listening at http://localhost:${PORT}`)
);

// Bonus credit for delete note functionality