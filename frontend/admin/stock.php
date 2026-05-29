<?php 
include '../../backend/config.php'; 
include '../../backend/functions.php'; 
verificarLogin(); 
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock - Gestão de Loja</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>

    <!-- SIDEBAR -->
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>Gestão Loja</h2>
        </div>
        
        <div class="menu">
            <a href="dashboard.php" class="menu-item">Dashboard</a>
            <a href="produtos.php" class="menu-item">Produtos</a>
            <a href="stock.php" class="menu-item active">Stock</a>
            <a href="vendas.php" class="menu-item">Vendas</a>
            <a href="relatorios.php" class="menu-item">Relatórios</a>
            <a href="utilizadores.php" class="menu-item">Utilizadores</a>
        </div>
    </div>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="main-content">
        
        <div class="header">
            <h1>Gestão de Stock</h1>
            <div class="user-info">
                <span>Bem-vindo, <strong><?= htmlspecialchars($_SESSION['nome'] ?? 'Admin') ?></strong></span>
                <button onclick="logout()" class="btn-sair">Sair</button>
            </div>
        </div>

        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <input type="text" id="search-stock" placeholder="Pesquisar por produto..." style="padding: 10px; width: 300px; border: 1px solid #ccc; border-radius: 5px;">
            </div>

            <table class="tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Categoria</th>
                        <th>Stock Atual</th>
                        <th>Stock Mínimo</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="lista-stock"></tbody>
            </table>
        </div>
    </div>

    <script src="js/stock.js"></script>
</body>
</html>