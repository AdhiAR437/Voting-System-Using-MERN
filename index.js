const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors=require('cors');
const session = require('express-session');
const crypto = require('crypto');

const secretkey = crypto.randomBytes(64).toString('hex');
const app = express();
app.use(session({
  secret: secretkey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));


const port = 3000;

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true
};
app.use(bodyParser.json());
app.use(cors(corsOptions));


// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voting_app_db'
  });
  
  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
  });


// API endpoint to verify Aadhaar number and name match
app.post('/verify-voter', (req, res) => {
  const { aadhaarNumber, name, phone } = req.body;
  
  // Query the database to check if Aadhaar number and name match
  connection.query(
    'SELECT * FROM adhaar_tb WHERE aadhaar_no = ? AND name = ? AND phone_no = ? AND voting_status=0',
    [aadhaarNumber, name, phone],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length > 0) {
        req.session.aadhaarno=aadhaarNumber;
        res.json({ match: true });
      } else {
        res.json({ match: false });
      }
    }
  );
});

// load all candidates
app.get('/candidates', (req, res) => {
  connection.query('SELECT candidate_name,age,party_name,id FROM candidate_tb', (error, results, fields) => {
    if (error) {
      console.error('Error fetching candidates: ' + error.stack);
      
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});


app.get('/candidates-votes', (req, res) => {
  connection.query('SELECT candidate_name,age,party_name,id,votes FROM candidate_tb', (error, results, fields) => {
    if (error) {
      console.error('Error fetching candidates: ' + error.stack);
      
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results);
  });
});

// app.post('/set-aadhaarno', (req, res) => {
//   req.session.aadhaarno = '123456789101';
//   res.send('Aadhaar Number set in session');
// });


// API endpoint to update vote count in candidate_tb and voting status in adhaar_tb
app.post('/update-vote', (req, res) => {
  const { candidateId } = req.body;
  const aadhaarno= req.session.aadhaarno;

  // // Update vote count in candidate_tb
  connection.query(
    'UPDATE candidate_tb SET votes = votes + 1 WHERE id = ?',
    [candidateId],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error 1' });
        return;
      }
      
      // Update voting status in adhaar_tb
      connection.query(
        'UPDATE adhaar_tb SET voting_status = 1 WHERE aadhaar_no = ?',
        [aadhaarno],
        (error, results, fields) => {
          if (error) {
            res.status(500).json({ error: 'Internal server error' });
            return;
          }

         req.session.destroy();
         res.send("Logged out");
        }
      );
    }
  );
});

app.get('/voting-stats', (req, res) => {
  const query = `
    SELECT
      COUNT(*) AS totalVoters,
      SUM(CASE WHEN voting_status = 1 THEN 1 ELSE 0 END) AS voted,
      SUM(CASE WHEN voting_status = 0 THEN 1 ELSE 0 END) AS notVoted,
      SUM(CASE WHEN gender = 'Male' AND voting_status = 1 THEN 1 ELSE 0 END) AS maleVoted,
      SUM(CASE WHEN gender = 'Female' AND voting_status = 1 THEN 1 ELSE 0 END) AS femaleVoted
    FROM
      adhaar_tb;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const {
      totalVoters,
      voted,
      notVoted,
      maleVoted,
      femaleVoted
    } = results[0];

    res.json({
      totalVoters,
      voted,
      notVoted,
      maleVoted,
      femaleVoted
    });
  });
});

app.post('/verify-admin', (req, res) => {
  const { user, password, code } = req.body;

  // Query the database to check if Aadhaar number and name match
  connection.query(
    'SELECT * FROM admin where user= ? and password = ? and code = ?',
    [user,password,code],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length > 0) {
        res.json({ match: true });
      } else {
        res.json({ match: false });
      }
    }
  );
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
