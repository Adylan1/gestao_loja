// relatorios.js - Relatórios

document.addEventListener('DOMContentLoaded', () => {
    carregarRelatorios();
});

// Dados fictícios para relatórios
function carregarRelatorios() {
    const tbody = document.getElementById('lista-relatorios');
    tbody.innerHTML = '';

    const relatorios = [
        {
            periodo: "Hoje (27/05/2026)",
            totalVendas: "68.450 MZN",
            numVendas: 12,
            maisVendido: "Teclado Mecânico"
        },
        {
            periodo: "Esta Semana",
            totalVendas: "284.750 MZN",
            numVendas: 47,
            maisVendido: "Monitor 24''"
        },
        {
            periodo: "Este Mês",
            totalVendas: "1.245.800 MZN",
            numVendas: 198,
            maisVendido: "Arroz 5kg"
        }
    ];

    relatorios.forEach(rel => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rel.periodo}</td>
            <td><strong>${rel.totalVendas}</strong></td>
            <td>${rel.numVendas}</td>
            <td>${rel.maisVendido}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função logout global
function logout() {
    if (confirm("Deseja sair do sistema?")) {
        window.location.href = "../login/index.html";
    }
}