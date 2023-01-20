const db = require('./db/connection');
// const mysql = require("mysql2"); // import the mysql connection
const express = require("express");
const inputCheck = require("./utils/inputCheck"); // check for errors when we use the post method when deconstruction the body we rely on this inputCheck method
const apiRoutes = require('./routes/apiRoutes');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware////////////////////////
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add after Express middleware
app.use('/api', apiRoutes);


// basic get to confirm server is up

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Default response for any other request (Not Found) or not supported by the app
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
