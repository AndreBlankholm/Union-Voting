const mysql = require("mysql2"); // import the mysql connection

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

  module.exports = db;