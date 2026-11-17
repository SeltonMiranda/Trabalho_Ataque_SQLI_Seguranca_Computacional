const express = require("express");
const db = require("./database");
const path = require("path")

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());

app.get("/produtos", (req, res) => {
    const categoria = req.query.categoria ?? "";

    const sql = `
        SELECT id, nome, preco
        FROM produtos
        WHERE categoria = '${categoria}'
    `;

    try {
        const produtos = db.prepare(sql).all();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.get("/produtos-seguro", (req, res) => {
    const categoria = req.query.categoria ?? "";

    const sql = `
        SELECT id, nome, preco
        FROM produtos
        WHERE categoria = ?
    `;

    try {
        const produtos = db.prepare(sql).all(categoria);
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
