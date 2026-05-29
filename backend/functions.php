<?php
// Função para verificar se o utilizador está logado
function verificarLogin() {
    if (!isset($_SESSION['user_id'])) {
        header("Location: ../login/index.php");
        exit();
    }
}

// Função para verificar se é Admin
function verificarAdmin() {
    if (!isset($_SESSION['cargo']) || $_SESSION['cargo'] !== 'Administrador') {
        header("Location: ../users/dashboard.php");
        exit();
    }
}
?>