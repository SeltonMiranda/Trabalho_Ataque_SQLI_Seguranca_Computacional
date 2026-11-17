const Database = require("better-sqlite3");

const db = new Database("database.sqlite");

// Recria o banco de demonstração a cada inicialização.
// Use somente dados fictícios neste exemplo.
db.exec(`
    DROP TABLE IF EXISTS produtos;
    DROP TABLE IF EXISTS usuarios;

    CREATE TABLE produtos (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        categoria TEXT NOT NULL
    );

    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        CPF TEXT NOT NULL
    );

    INSERT INTO produtos (nome, preco, categoria) VALUES
        ('Notebook', 3500, 'Eletronicos'),
        ('Mouse', 80, 'Eletronicos'),
        ('Teclado', 150, 'Eletronicos'),
        ('Cadeira', 900, 'Moveis'),
        ('Mesa', 1200, 'Moveis');

    INSERT INTO usuarios (username, password, CPF) VALUES
        ('admin', '123mudar', '123456789'),
        ('Alice', 'senha_alice', '127001'),
        ('Bob', 'senha_bob', '80808080');
`);

module.exports = db;
