// dashboard.js - JavaScript do Dashboard

document.addEventListener('DOMContentLoaded', function() {
    
    // Preenche os números do dashboard (dados fictícios)
    document.getElementById('total-produtos').textContent = '142';
    document.getElementById('vendas-hoje').textContent = 'MZN 48.250';
    document.getElementById('stock-baixo').textContent = '8';
    document.getElementById('total-vendedores').textContent = '12';

    
    // Preenche tabela de vendas recentes
    const tbody = document.getElementById('tabela-vendas');
    
    const vendas = [
        {id: "V001", data: "27/05/2026", cliente: "João Macamo", total: "12.500", estado: "Concluída"},
        {id: "V002", data: "27/05/2026", cliente: "Maria Langa", total: "8.750",  estado: "Concluída"},
        {id: "V003", data: "26/05/2026", cliente: "Carlos Tembe", total: "23.400", estado: "Pendente"},
        {id: "V004", data: "26/05/2026", cliente: "Ana Nhaca",   total: "6.700",  estado: "Concluída"}
    ];

    vendas.forEach(venda => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.data}</td>
            <td>${venda.cliente}</td>
            <td>${venda.total} MZN</td>
            <td><span class="estado ${venda.estado === 'Concluída' ? 'sucesso' : 'pendente'}">${venda.estado}</span></td>
        `;
        tbody.appendChild(tr);
    });
});