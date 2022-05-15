const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/notes', (req,res) => {
    // Send file 'notes.html'
    res.sendFile(path)
});

app.get('/api/notes', (req,res) => {
    // Send file 'notes.html'
    res.json( /* send note data */ )
});

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