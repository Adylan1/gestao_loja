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
    <title>Dashboard - Gestão de Loja</title>
    
    <link rel="stylesheet" href="css/dashboard.css">
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
        
        <!-- Cabeçalho -->
        <div class="header">
            <h1>Dashboard</h1>
           <div class="user-info">
            <span>Bem-vindo, <strong><?= htmlspecialchars($_SESSION['nome'] ?? 'Utilizador') ?></strong></span>
            <button onclick="logout()" class="btn-sair">Sair</button>
        </div>
    </div>

        <!-- Cards de Estatísticas -->
        <div class="cards-container">
            
            <div class="card">
                <div class="card-info">
                    <p class="card-titulo">Total de Produtos</p>
                    <h3 class="card-numero" id="total-produtos">142</h3>
                </div>
            </div>

            <div class="card">
                <div class="card-info">
                    <p class="card-titulo">Vendas de Hoje</p>
                    <h3 class="card-numero" id="vendas-hoje">MZN 48.000</h3>
                </div>
            </div>

            <div class="card">
                <div class="card-info">
                    <p class="card-titulo">Produtos com Stock Baixo</p>
                    <h3 class="card-numero" id="stock-baixo">8</h3>
                </div>
            </div>

            <div class="card">
                <div class="card-info">
                    <p class="card-titulo">Total Vendedores</p>
                    <h3 class="card-numero" id="total-vendedores">12</h3>
                </div>
            </div>

        </div>

        <!-- Tabela de Vendas Recentes -->
        <div class="card">
            <h2 class="card-titulo">Vendas Recentes</h2>
            <table class="tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="tabela-vendas"></tbody>
            </table>
        </div>

    </div>


    <script src="dashboard.js"></script>
</body>
</html>