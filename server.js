// import dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.static('public'));
app.use(express.json());

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
    // Push it to my existing lisst of notes
    // Write my updates note list to the `db.json` file
});

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);

// Bonus credit for delete note functionality