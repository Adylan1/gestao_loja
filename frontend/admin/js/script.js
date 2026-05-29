// stock.js - Gestão de Stock REAL com Banco de Dados

document.addEventListener('DOMContentLoaded', () => {
    carregarStock();
});

function carregarStock() {
    fetch('../../backend/stock.php?action=listar')
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('lista-stock');
            tbody.innerHTML = '';

            data.forEach(item => {
                const status = item.stock <= (item.stock_minimo || 10) ? 'Baixo' : 'Normal';
                const classe = item.stock <= (item.stock_minimo || 10) ? 'status-baixo' : 'status-normal';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.categoria || '-'}</td>
                    <td><strong>${item.stock}</strong></td>
                    <td>${item.stock_minimo || 10}</td>
                    <td><span class="${classe}">${status}</span></td>
                    <td>
                        <button onclick="ajustarStock('${item.id}')" class="btn btn-primary">Ajustar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

// Ajustar stock
function ajustarStock(id) {
    const novoStock = prompt("Novo quantidade em stock:", "0");
    if (novoStock === null) return;

    fetch('../../backend/stock.php?action=atualizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, stock: parseInt(novoStock) })
    })
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            carregarStock();
            alert("Stock atualizado com sucesso!");
        }
    });
}

function logout() {
    if (confirm("Deseja sair do sistema?")) {
        window.location.href = "../login/index.php";
    }
}