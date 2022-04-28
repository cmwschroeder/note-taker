const express = require('express');
const path = require('path');
const notes = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

//when we click on the get started button on the index page it will send us to /notes which will open the notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) =>{
  //deconstruct the request body into title and text so we can write them to our database.

  //make sure that there is a body
  if(req.body) {
    const { title, text } = req.body;

    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    console.log(newNote);

    res.json("Note added");
  }
});

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);