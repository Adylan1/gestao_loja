// app.js - Login

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const tipoAcesso = document.querySelector('input[name="tipo_acesso"]:checked').value;

    // Simulação de login (depois vamos ligar ao PHP)
    if (username === "admin" && (password === "1234" || password === "")) {
        window.location.href = "../admin/dashboard.html";
    } 
    else if (username === "ana.vendedora" || username === "joao.caixa") {
        window.location.href = "../users/dashboard.html";
    } 
    else {
        alert("Username ou senha incorretos!\n\nTeste com:\n- admin / 1234");
    }
});

// Permitir login pressionando Enter
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});