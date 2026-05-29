// utilizadores.js - Gestão de Utilizadores

let utilizadores = [
    { id: "U001", nome: "Carlos Admin", username: "admin", cargo: "Administrador", estado: "Ativo" },
    { id: "U002", nome: "Ana Silva", username: "ana.vendedora", cargo: "Vendedora", estado: "Ativo" },
    { id: "U003", nome: "João Mabunda", username: "joao.caixa", cargo: "Caixa", estado: "Ativo" },
    { id: "U004", nome: "Maria Tembe", username: "maria.vendedora", cargo: "Vendedora", estado: "Inativo" }
];

// Carregar tabela de utilizadores
function carregarUtilizadores() {
    const tbody = document.getElementById('lista-utilizadores');
    tbody.innerHTML = '';

    utilizadores.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.username}</td>
            <td>${user.cargo}</td>
            <td><span class="estado ${user.estado === 'Ativo' ? 'sucesso' : 'pendente'}">${user.estado}</span></td>
            <td>
                <button onclick="editarUtilizador('${user.id}')" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.9rem;">Editar</button>
                <button onclick="toggleEstado('${user.id}')" class="btn btn-danger" style="padding: 5px 10px; font-size: 0.9rem;">Alterar Estado</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Simular adicionar novo utilizador
function novoUtilizador() {
    const nome = prompt("Nome completo do utilizador:");
    if (!nome) return;

    const username = prompt("Username:", nome.toLowerCase().replace(" ", "."));
    if (!username) return;

    const cargo = prompt("Cargo (Administrador / Vendedora / Caixa):", "Vendedora");

    const novoUser = {
        id: "U" + String(100 + utilizadores.length),
        nome: nome,
        username: username,
        cargo: cargo,
        estado: "Ativo"
    };

    utilizadores.push(novoUser);
    carregarUtilizadores();
    alert("Utilizador criado com sucesso!");
}

// Simular edição (simples)
function editarUtilizador(id) {
    alert("Funcionalidade de edição completa será implementada depois.\n\nPor agora é só demonstração.");
}

// Alternar estado do utilizador
function toggleEstado(id) {
    const user = utilizadores.find(u => u.id === id);
    if (user) {
        user.estado = user.estado === "Ativo" ? "Inativo" : "Ativo";
        carregarUtilizadores();
    }
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    carregarUtilizadores();
});

// Função logout global
function logout() {
    if (confirm("Deseja sair do sistema?")) {
        window.location.href = "../login/index.html";
    }
}