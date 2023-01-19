const mysql = require("mysql2"); // import the mysql connection
const express = require("express");
const inputCheck = require('./utils/inputCheck'); // check for errors when we use the post method when deconstruction the body we rely on this inputCheck method

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



// all parties
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

//parties by id
app.get('/api/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});



// deleted a party
app.delete('/api/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'Party not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

/////////////////////////////
// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Andre', 'Blankholm', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected'); // pulling the body out and checking to make sure it has these params only
    
    if (errors) {
      res.status(400).json({ error: errors });  
      return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;

    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
  });

/////////////////////////////////////////////////////////////
// select all from and wrap it in a Exprress.js route
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
  AS party_name 
  FROM candidates 
  LEFT JOIN parties 
  ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

/////////////////////////////////////////////////
// select one from
// db.query(`SELECT * FROM candidates WHERE id = 2`, (err, row) => {
//     if(err){
//         console.log(err);
//     } 
//     console.log(row);
// });
// Get a single candidate

app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
  AS party_name 
  FROM candidates 
  LEFT JOIN parties 
  ON candidates.party_id = parties.id 
  WHERE candidates.id = ?`;

  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});


//////////////////////////////////////////////
// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

////////////////////////////////////////////////////////
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
