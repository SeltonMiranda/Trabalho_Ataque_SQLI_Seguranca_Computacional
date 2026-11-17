
const categoria = document.querySelector("#categoria");
const modo = document.querySelector("#modo");
const resultado = document.querySelector("#resultado");
const sqlElement = document.querySelector("#sql");


// x' UNION SELECT 1, name, 3 FROM sqlite_master WHERE type = 'table'; --
// x' UNION SELECT cid, name, type FROM pragma_table_info('usuarios'); --
// x' UNION SELECT id, username, password FROM usuarios; --

async function consultar(valor) {
    const vulneravel = modo.value === "vulneravel";

    const endpoint = vulneravel
        ? "/produtos"
        : "/produtos-seguro";

    const sql = vulneravel
        ? `SELECT id, nome, preco FROM produtos
WHERE categoria = '${valor}'`
        : `SELECT id, nome, preco FROM produtos
WHERE categoria = ?`;

    sqlElement.textContent = sql;

    resultado.textContent = "Consultando...";

    try {
        const response = await fetch(
            `${endpoint}?categoria=${encodeURIComponent(valor)}`
        );

        const dados = await response.json();

        if (!response.ok) {
            throw new Error(dados.erro || "Erro na consulta");
        }

        mostrarResultados(dados);

    } catch (error) {
        resultado.textContent = `Erro: ${error.message}`;
    }
}

function mostrarResultados(dados) {
    if (dados.length === 0) {
        resultado.textContent = "Nenhum resultado encontrado.";
        return;
    }

    const tabela = document.createElement("table");

    tabela.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = tabela.querySelector("tbody");

    dados.forEach(item => {
        const tr = document.createElement("tr");

        [item.id, item.nome, item.preco].forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    resultado.replaceChildren(tabela);
}

document.querySelector("#consultar").addEventListener("click", () => {
    consultar(categoria.value);
});
