// vendas.js - Registo de Vendas

let vendas = [
    { id: "V001", data: "27/05/2026", cliente: "João Macamo", produtos: "Teclado + Mouse", total: 15800, estado: "Concluída" },
    { id: "V002", data: "27/05/2026", cliente: "Maria Langa", produtos: "Arroz 5kg + Óleo", total: 8750, estado: "Concluída" },
    { id: "V003", data: "26/05/2026", cliente: "Carlos Tembe", produtos: "Monitor 24''", total: 28500, estado: "Pendente" },
    { id: "V004", data: "26/05/2026", cliente: "Ana Nhaca", produtos: "Coca-Cola 2L (3un)", total: 5400, estado: "Concluída" }
];

// Carregar tabela de vendas
function carregarVendas() {
    const tbody = document.getElementById('lista-vendas');
    tbody.innerHTML = '';

    vendas.forEach(venda => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.data}</td>
            <td>${venda.cliente}</td>
            <td>${venda.produtos}</td>
            <td>${venda.total.toLocaleString('pt-MZ')} MZN</td>
            <td><span class="estado ${venda.estado === 'Concluída' ? 'sucesso' : 'pendente'}">${venda.estado}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Simular nova venda
function novaVenda() {
    const cliente = prompt("Nome do cliente:");
    if (!cliente) return;

    const total = parseFloat(prompt("Valor total da venda (MZN):", "15000"));
    if (!total) return;

    const novaVenda = {
        id: "V" + String(1000 + vendas.length),
        data: "27/05/2026",
        cliente: cliente,
        produtos: "Venda rápida",
        total: total,
        estado: "Concluída"
    };

    vendas.unshift(novaVenda); // Adiciona no topo
    carregarVendas();
    
    alert("Venda registada com sucesso!");
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    carregarVendas();
});

// Função logout global
function logout() {
    if (confirm("Deseja sair do sistema?")) {
        window.location.href = "../login/index.html";
    }
}