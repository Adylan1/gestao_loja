<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Vendedor</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../admin/css/admin.css">
</head>
<body>

    <!-- SIDEBAR SIMPLES PARA UTILIZADOR -->
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>Gestão Loja</h2>
            <p style="font-size: 0.9rem; color: #aaa; text-align: center;">Vendedor</p>
        </div>
        
        <div class="menu">
            <a href="dashboard.html" class="menu-item active">Dashboard</a>
            <a href="nova-venda.html" class="menu-item">Nova Venda</a>
        </div>
    </div>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="main-content">
        
        <div class="header">
            <h1>Dashboard do Vendedor</h1>
            <div class="user-info">
                <span>Bem-vindo, <strong>Carlos Vendedor</strong></span>
                <button onclick="logout()" class="btn-sair">Sair</button>
            </div>
        </div>

        <div class="cards-container">
            
            <div class="card">
                <div class="card-info">
                    <p class="card-titulo">Vendas Hoje</p>
                    <h3 class="card-numero" id="vendas-hoje-user">MZN 18.450</h3>
                </div>
            </div>

            <div class="card">
                <div class="card-info">
                    <p class="card-titulo">Número de Vendas</p>
                    <h3 class="card-numero" id="num-vendas">7</h3>
                </div>
            </div>

            <div class="card">
                <div class="card-info">
                    <p class="card-titulo">Ticket Médio</p>
                    <h3 class="card-numero" id="ticket-medio">MZN 2.635</h3>
                </div>
            </div>

        </div>

        <div class="card">
            <h2>Minhas Últimas Vendas</h2>
            <table class="tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="ultimas-vendas"></tbody>
            </table>
        </div>
    </div>

    <script src="style.css"></script>
    <script src="dashboard.js"></script>
</body>
</html>