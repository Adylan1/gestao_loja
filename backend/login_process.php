<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Query corrigida - usando 'username' em vez de 'email'
    $stmt = $pdo->prepare("SELECT * FROM utilizadores WHERE username = ? AND estado = 'Ativo'");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['senha'])) {
        
        $_SESSION['user_id']   = $user['id'];
        $_SESSION['username']  = $user['username'];
        $_SESSION['nome']      = $user['nome'];
        $_SESSION['cargo']     = $user['cargo'];

        if ($user['cargo'] === 'Administrador') {
            header("Location: ../admin/dashboard.php");
        } else {
            header("Location: ../users/dashboard.php");
        }
        exit();
        
    } else {
        header("Location: ../frontend/login/index.php?erro=Username ou senha incorretos");
        exit();
    }
}
?>