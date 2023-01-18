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

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Andre', 'Blankholm', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// select all from 
// db.query(`Select * FROM candidates`, (err, rows) => {  // inital mysql connection check in commandline
//     console.log(rows);
// });

// select one from
// db.query(`SELECT * FROM candidates WHERE id = 2`, (err, row) => {
//     if(err){
//         console.log(err);
//     } 
//     console.log(row);
// });

// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });

// Default response for any other request (Not Found) or not supported by the app 
app.use((req, res) => {
    res.status(404).end();
  });



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
