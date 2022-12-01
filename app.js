const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "movies"
});

db.connect((err) => {
    if (err) {
        console.log('Erreur de connexion', err);
        return;
    }
    console.log('Connecté');
});


app.get('/api/movies', (req, res) => {
    db.query("SELECT * FROM movies", (err, result) => {
        if (err) {
            res.status(404).json();
        } else {
            res.json(result);
        }
    });
});

app.get('/api/movies/:id', (req, res) => {

});

app.put('/api/movies', (req, res) => {

    db.query("INSERT INTO movies (title,genre,annee) VALUES (?, ?, ?)", 
    [req.body.title, req.body.genre, req.body.annee], 
    (err, result) => {
        if (err) {
            res.status(404).json();
        } else {
            res.json({ok: "ok"});
        }
    });
    
});

app.patch('/api/movies/:id', (req, res) => {

});

app.delete('/api/movies/:id', (req, res) => {
    
});



app.get('/api/actors', (req, res) => {
   
});

app.get('/api/actors/:id', (req, res) => {

});

app.put('/api/actors', (req, res) => {
 
});

app.patch('/api/actors/:id', (req, res) => {

});

app.delete('/api/actors/:id', (req, res) => {

});

app.listen(80, () => {
    console.log('up');
});