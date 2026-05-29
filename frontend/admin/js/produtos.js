// frontend/admin/js/produtos.js

let produtoEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

function carregarProdutos() {
    fetch('../../backend/produtos.php?action=listar')
        .then(response => response.json())
        .then(produtos => {
            const tbody = document.getElementById('lista-produtos');
            tbody.innerHTML = '';

            produtos.forEach(p => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.categoria || '-'}</td>
                    <td>${Number(p.preco).toLocaleString('pt-MZ')} MZN</td>
                    <td>${p.stock}</td>
                    <td>
                        <button onclick="editarProduto('${p.id}')" class="btn btn-primary">Editar</button>
                        <button onclick="deletarProduto('${p.id}')" class="btn btn-danger">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro:', error));
}

function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-titulo').textContent = 'Novo Produto';
    document.getElementById('form-produto').reset();
    produtoEditando = null;
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

function salvarProduto() {
    const dados = {
        id: document.getElementById('prod_id').value,
        nome: document.getElementById('prod_nome').value,
        categoria: document.getElementById('prod_categoria').value,
        preco: document.getElementById('prod_preco').value,
        stock: document.getElementById('prod_stock').value
    };

    const url = produtoEditando 
        ? '../../backend/produtos.php?action=atualizar' 
        : '../../backend/produtos.php?action=adicionar';

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            alert(produtoEditando ? "Produto atualizado!" : "Produto adicionado com sucesso!");
            fecharModal();
            carregarProdutos();
        }
    });
}

function editarProduto(id) {
    alert("Editar " + id + " - Em desenvolvimento");
}

function deletarProduto(id) {
    if (confirm("Eliminar este produto?")) {
        fetch(`../../backend/produtos.php?action=eliminar&id=${id}`)
            .then(res => res.json())
            .then(result => {
                if (result.success) carregarProdutos();
            });
    }
}

function logout() {
    if (confirm("Deseja sair?")) {
        window.location.href = "../login/index.php";
    }
}