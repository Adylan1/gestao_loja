// produtos.js - Gestão de Produtos (Melhorado)

let produtos = [
    { id: "P001", nome: "Teclado Mecânico", categoria: "Eletrónicos", preco: 12500, stock: 15 },
    { id: "P002", nome: "Camiseta Preta", categoria: "Roupa", preco: 4500, stock: 48 },
    { id: "P003", nome: "Arroz 5kg", categoria: "Alimentos", preco: 3200, stock: 23 },
    { id: "P004", nome: "Coca-Cola 2L", categoria: "Bebidas", preco: 1800, stock: 67 },
    { id: "P005", nome: "Monitor 24 polegadas", categoria: "Eletrónicos", preco: 28500, stock: 7 }
];

let produtoEditando = null;

// Carregar tabela
function carregarTabela() {
    const tbody = document.getElementById('lista-produtos');
    tbody.innerHTML = '';

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.preco.toLocaleString('pt-MZ')} MZN</td>
            <td>${produto.stock}</td>
            <td>
                <button onclick="editarProduto('${produto.id}')" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.9rem;">Editar</button>
                <button onclick="deletarProduto('${produto.id}')" class="btn btn-danger" style="padding: 5px 10px; font-size: 0.9rem;">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Abrir modal para novo produto
function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-titulo').textContent = 'Novo Produto';
    document.getElementById('form-produto').reset();
    produtoEditando = null;
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Salvar produto (Adicionar ou Editar)
function salvarProduto() {
    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const stock = parseInt(document.getElementById('stock').value);

    if (!nome || !categoria || isNaN(preco) || isNaN(stock)) {
        alert("Por favor preencha todos os campos corretamente!");
        return;
    }

    if (produtoEditando) {
        // === EDITAR ===
        const produto = produtos.find(p => p.id === produtoEditando);
        if (produto) {
            produto.nome = nome;
            produto.categoria = categoria;
            produto.preco = preco;
            produto.stock = stock;
        }
    } else {
        // === ADICIONAR ===
        const novoId = "P" + String(100 + produtos.length).slice(1);
        
        produtos.push({
            id: novoId,
            nome: nome,
            categoria: categoria,
            preco: preco,
            stock: stock
        });
    }

    fecharModal();
    carregarTabela();
    alert(produtoEditando ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!");
}

// Editar produto
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    produtoEditando = id;

    document.getElementById('modal-titulo').textContent = 'Editar Produto';
    document.getElementById('nome').value = produto.nome;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('stock').value = produto.stock;

    document.getElementById('modal').style.display = 'flex';
}

// Eliminar produto
function deletarProduto(id) {
    if (confirm("Tem certeza que deseja eliminar este produto?")) {
        produtos = produtos.filter(p => p.id !== id);
        carregarTabela();
    }
}

// Pesquisa
function configurarPesquisa() {
    const searchInput = document.getElementById('search');
    
    searchInput.addEventListener('input', () => {
        const termo = searchInput.value.toLowerCase().trim();
        const tbody = document.getElementById('lista-produtos');
        tbody.innerHTML = '';

        const filtrados = produtos.filter(produto => 
            produto.nome.toLowerCase().includes(termo) || 
            produto.categoria.toLowerCase().includes(termo)
        );

        filtrados.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>${produto.preco.toLocaleString('pt-MZ')} MZN</td>
                <td>${produto.stock}</td>
                <td>
                    <button onclick="editarProduto('${produto.id}')" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.9rem;">Editar</button>
                    <button onclick="deletarProduto('${produto.id}')" class="btn btn-danger" style="padding: 5px 10px; font-size: 0.9rem;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    carregarTabela();
    configurarPesquisa();
});

function logout() {
    if (confirm("Deseja sair do sistema?")) {
        window.location.href = "../login/index.html";
    }
}