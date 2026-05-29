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
    <title>Vendas - Gestão de Loja</title>

    <link rel="stylesheet" href="css/admin.css">
</head>
<body>

    <!-- SIDEBAR -->
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>Gestão Loja</h2>
        </div>
         <div class="menu">
            <a href="dashboard.php" class="menu-item active">Dashboard</a>
            <a href="produtos.php" class="menu-item">Produtos</a>
            <a href="stock.php" class="menu-item">Stock</a>
            <a href="vendas.php" class="menu-item">Vendas</a>
            <a href="relatorios.php" class="menu-item">Relatórios</a>
            <a href="utilizadores.php" class="menu-item">Utilizadores</a>
        </div>
    </div>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="main-content">
        
        <div class="header">
            <h1>Registo de Vendas</h1>
            <div class="user-info">
                <span>Bem-vindo, <strong>Admin</strong></span>
                <button onclick="logout()" class="btn-sair">Sair</button>
            </div>
        </div>

        <div class="card">
            <button onclick="novaVenda()" class="btn btn-primary" style="margin-bottom: 20px;">
                + Nova Venda
            </button>

            <table class="tabela" id="tabela-vendas">
                <thead>
                    <tr>
                        <th>ID Venda</th>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Produtos</th>
                        <th>Total (MZN)</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="lista-vendas">
                    <!-- Preenchido pelo JS -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="js/vendas.js"></script>

</body>
</html>