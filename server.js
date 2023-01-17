const mysql = require("mysql2"); // import the mysql connection
const express = require("express");


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware////////////////////////
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mysql code that will connect the MySQL database
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "Andre111$",
    database: "elections",
  },
  console.log("Connected to the elections database.")
);


db.query(`Select * FROM candidates`, (err, rows) => {  // inital mysql connection check in commandline
    console.log(rows);
})
// Default response for any other request (Not Found) intial connection check in http://localhost:3001/ 
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
