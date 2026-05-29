<?php 
include '../../backend/config.php'; 
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MissavaStore - Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="container">
        <div class="lado-direito">
            <div class="login-box">

                <span class="small-title">ACESSO AO SISTEMA</span>
                <h1>Bem-vindo de volta</h1>
                <p>Selecione o seu perfil e entre na sua conta</p>

                <?php if(isset($_GET['erro'])): ?>
                    <p style="color: red; background: #ffe6e6; padding: 10px; border-radius: 8px; text-align: center;">
                        <?= htmlspecialchars($_GET['erro']) ?>
                    </p>
                <?php endif; ?>

                <!-- FORMULÁRIO REAL (PHP) -->
                <form action="../../backend/login_process.php" method="POST">
                    
                    <div class="Tipo_Acesso">
                        <label>
                            <input type="radio" name="tipo_acesso" value="admin" checked> Administrador
                        </label>
                        <label>
                            <input type="radio" name="tipo_acesso" value="user"> Utilizador
                        </label>
                    </div>

                    <div class="input-group">
                        <label>Email ou Username</label>
                        <input type="text" name="username" placeholder="admin" required>
                    </div>

                    <div class="input-group">
                        <label>Palavra-passe</label>
                        <input type="password" name="password" placeholder="••••••••" required>
                    </div>

                    <button type="submit">Entrar</button>
                </form>

                <div class="rodape">
                    <p>MissavaStore © 2026 — Sistema de Gestão de Lojas</p>
                </div>

            </div>
        </div>
    </div>

</body>
</html>