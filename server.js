const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve images, css files, js files from the public directory
// Allows us to reference files with their relative path
// Example: http://localhost:3000/images/cat.jpg
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

//when we click on the get started button on the index page it will send us to /notes which will open the notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);