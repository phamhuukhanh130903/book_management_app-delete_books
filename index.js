const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'book_manager',
    charset: 'utf8_general_ci',
});

connection.connect(function (err) {
    if (err) {
    throw err.stack;
    } else {
    console.log('connect database successfully')
    }
   });

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

app.get('/books/create', (req, res) => {
    res.render('create');
})

app.post('/books/create', (req, res) => {
    const { name, price, status, author } = req.body;
    console.log(req.body);
const sqlInsert = "Insert into books (bookname, price, status, author) values ?";
const value = [
[name, price, status, author]
];
connection.query(sqlInsert, [value], function (err, result) {
    if (err) throw err;
    res.end("success");
    });
   });

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books";
    connection.query(sql, function (err, result) {
        if(err) throw err;
        res.render("index", {books: result});
    });
});

app.get("/books/:id/delete", (req, res) => {
    const idBook = req.params.id;
   
    const sql = "DELETE FROM books WHERE id = " + idBook;
    connection.query(sql, function (err, result) {
    if (err) throw err;
    res.redirect('/books')
    });
   })
