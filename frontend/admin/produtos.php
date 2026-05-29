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
    <title>Produtos - Gestão de Loja</title>
    
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
            <a href="produtos.php" class="menu-item active">Produtos</a>
            <a href="stock.php" class="menu-item">Stock</a>
            <a href="vendas.php" class="menu-item">Vendas</a>
            <a href="relatorios.php" class="menu-item">Relatórios</a>
            <a href="utilizadores.php" class="menu-item">Utilizadores</a>
        </div>
    </div>

    <!-- CONTEÚDO PRINCIPAL -->
    <div class="main-content">
        <div class="header">
            <h1>Gestão de Produtos</h1>
            <div class="user-info">
                <span>Bem-vindo, <strong><?= htmlspecialchars($_SESSION['nome'] ?? 'Admin') ?></strong></span>
                <button onclick="logout()" class="btn-sair">Sair</button>
            </div>
        </div>

        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <input type="text" id="search" placeholder="Pesquisar produto..." style="padding: 10px; width: 300px;">
                <button onclick="abrirModal()" class="btn btn-primary">+ Novo Produto</button>
            </div>

            <table class="tabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço (MZN)</th>
                        <th>Stock</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="lista-produtos"></tbody>
            </table>
        </div>
    </div>

    <!-- MODAL -->
    <div id="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1000; justify-content: center; align-items: center;">
        <div style="background: white; padding: 25px; border-radius: 10px; width: 420px;">
            <h2 id="modal-titulo">Novo Produto</h2>
            
            <form id="form-produto">
                <div class="form-group">
                    <label>ID</label>
                    <input type="text" id="prod_id" required>
                </div>
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" id="prod_nome" required>
                </div>
                <div class="form-group">
                    <label>Categoria</label>
                    <select id="prod_categoria" required>
                        <option value="">Selecione</option>
                        <option value="Eletrónicos">Eletrónicos</option>
                        <option value="Roupa">Roupa</option>
                        <option value="Alimentos">Alimentos</option>
                        <option value="Bebidas">Bebidas</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Preço (MZN)</label>
                    <input type="number" id="prod_preco" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Stock</label>
                    <input type="number" id="prod_stock" required>
                </div>

                <div style="margin-top: 20px;">
                    <button type="button" onclick="salvarProduto()" class="btn btn-primary">Salvar</button>
                    <button type="button" onclick="fecharModal()">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <script src="js/produtos.js"></script>
</body>
</html>