 // server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = require('./src/database');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MySQL
// const db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '153646',
//     database: 'project1'
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to database');
// });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src')));

// Endpoint to save image link
app.post('/saveImage', (req, res) => {
    let sql = 'SELECT id FROM images WHERE link = ?';
    db.query(sql, [req.body.link], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            // If the image already exists, return the existing image ID
            res.json({imageId: results[0].id});
        } else {
            // If the image does not exist, insert a new record and return the new image ID
            sql = 'INSERT INTO images SET ?';
            let image = {link: req.body.link, description: req.body.description};
            db.query(sql, image, (err, result) => {
                if (err) throw err;
                res.json({imageId: result.insertId});
            });
        }
    });
});

// Endpoint to save a comment
app.post('/saveComment', (req, res) => {
    // Check if imageId and text are provided in the request body
    if (!req.body.imageId || typeof req.body.text !== 'string' || !req.body.text.trim()) {
        // If not, send an error response
        return res.status(400).send('Missing imageId or text');
    }

    let sql = 'INSERT INTO comments SET ?';
    let comment = {image_id: req.body.imageId, text: req.body.text.trim()};
    db.query(sql, comment, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Comment saved'}); // Send a JSON response
    });
});

// Modify this endpoint
app.get('/getImages', (req, res) => {
    let sql = 'SELECT id, link, description FROM images'; // Only select the columns you need
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Endpoint to get all comments for a specific image
app.get('/getComments/:imageId', (req, res) => {
    let sql = 'SELECT * FROM comments WHERE image_id = ?';
    db.query(sql, [req.params.imageId], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Modify this endpoint
app.get('/getPostDescriptions', (req, res) => {
    let sql = 'SELECT description FROM images'; // Only select the column you need
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
});




