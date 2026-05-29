// stock.js - Gestão de Stock

let stockProdutos = [
    { id: "P001", nome: "Teclado Mecânico", categoria: "Eletrónicos", stockAtual: 15, stockMinimo: 10 },
    { id: "P002", nome: "Camiseta Preta", categoria: "Roupa", stockAtual: 48, stockMinimo: 20 },
    { id: "P003", nome: "Arroz 5kg", categoria: "Alimentos", stockAtual: 23, stockMinimo: 15 },
    { id: "P004", nome: "Coca-Cola 2L", categoria: "Bebidas", stockAtual: 67, stockMinimo: 30 },
    { id: "P005", nome: "Monitor 24 polegadas", categoria: "Eletrónicos", stockAtual: 7, stockMinimo: 8 }
];

// Função para carregar a tabela
function carregarStock() {
    const tbody = document.getElementById('lista-stock');
    tbody.innerHTML = '';

    stockProdutos.forEach(item => {
        const status = item.stockAtual <= item.stockMinimo ? 'Baixo' : 'Normal';
        const classeStatus = item.stockAtual <= item.stockMinimo ? 'status-baixo' : 'status-normal';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.categoria}</td>
            <td><strong>${item.stockAtual}</strong></td>
            <td>${item.stockMinimo}</td>
            <td><span class="${classeStatus}">${status}</span></td>
            <td>
                <button onclick="ajustarStock('${item.id}')" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.9rem;">Ajustar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para pesquisar no stock
function configurarPesquisaStock() {
    const searchInput = document.getElementById('search-stock');
    
    searchInput.addEventListener('input', () => {
        const termo = searchInput.value.toLowerCase();
        const tbody = document.getElementById('lista-stock');
        tbody.innerHTML = '';

        const filtrados = stockProdutos.filter(item => 
            item.nome.toLowerCase().includes(termo) || 
            item.categoria.toLowerCase().includes(termo)
        );

        filtrados.forEach(item => {
            const status = item.stockAtual <= item.stockMinimo ? 'Baixo' : 'Normal';
            const classeStatus = item.stockAtual <= item.stockMinimo ? 'status-baixo' : 'status-normal';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.categoria}</td>
                <td><strong>${item.stockAtual}</strong></td>
                <td>${item.stockMinimo}</td>
                <td><span class="${classeStatus}">${status}</span></td>
                <td>
                    <button onclick="ajustarStock('${item.id}')" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.9rem;">Ajustar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

// Função simples para ajustar stock (simulação)
function ajustarStock(id) {
    const item = stockProdutos.find(p => p.id === id);
    if (!item) return;

    const novoStock = prompt(`Novo stock para "${item.nome}" (atual: ${item.stockAtual}):`, item.stockAtual);
    
    if (novoStock !== null) {
        item.stockAtual = parseInt(novoStock);
        carregarStock();
    }
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    carregarStock();
    configurarPesquisaStock();
});

// Função logout global
function logout() {
    if (confirm("Deseja sair do sistema?")) {
        window.location.href = "../login/index.html";
    }
}