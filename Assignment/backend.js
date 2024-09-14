// Importing required modules
const express = require('express');
const mysql = require('mysql2');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: 'password',  // Your MySQL password
  database: 'database'  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Google Sheets API setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Path to your service account key file
  scopes: SCOPES
});

const sheets = google.sheets({ version: 'v4', auth });

const SHEET_ID = "1_XfcPmGKBKI4lC35l5HVQRUHofNlzut-RZwFaxQv2eo"; // Your Google Sheet ID

// Route to update the database from Google Sheets
app.post('/sync-db', async (req, res) => {
  const { range, value } = req.body;

  // Assuming 'range' is like 'A1', 'B2' and so on
  let col = range.charAt(0);
  let row = parseInt(range.slice(1));

  // Custom logic: You may want to map the range to specific columns in your database
  const query = `UPDATE your_table SET your_column = '${value}' WHERE id = ${row}`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating the database' });
    }
    res.status(200).json({ message: 'Database updated successfully' });
  });
});

// Route to sync Google Sheets from the database
app.post('/sync-sheet', async (req, res) => {
  const { range, value } = req.body;

  try {
    // Write to Google Sheets
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: range,  // The range where you want to update
      valueInputOption: 'RAW',
      resource: {
        values: [[value]]
      }
    });

    res.status(200).json({ message: 'Google Sheet updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating Google Sheet' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
