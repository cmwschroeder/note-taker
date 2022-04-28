const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require("./db/notes.json");
const { v4: uuidv4 } = require('uuid');

//Initialize the server and give it a port
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//set the app to use the public folder
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

//when we click on the get started button on the index page it will send us to /notes which will open the notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Get request where the server will send the notes in the note database
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

//Post request for the notes api, will take in a request body and add that to the notes database with title, text, and a unique id.
app.post('/api/notes', (req, res) =>{
  
  //make sure that there is a body
  if(req.body) {
    //deconstruct the request body into title and text so we can write them to our database.
    const { title, text } = req.body;

    //create a new object that we will add to our database
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    //first we have to get the current database so we don't overwrite and we add the new object while still
    //keeping the correct structure needed for a json object
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
      if(!err) {
        //convert the data to an array of objects
        const dbData = JSON.parse(data);
        //push our new note onto this array
        dbData.push(newNote);
        //write the array back into the file with our new object inside of it
        fs.writeFile('./db/notes.json', JSON.stringify(dbData, null, 4), (err) => {
          if(err) {
            console.error(err);
          }
        });
      }
      //if there was an error writing to file write the error to the console 
      else {
        console.error(err);
      }
    });

    //respond that the note has been added.
    res.json("Note added");
  }
});

//Tell the console where the server is at
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);