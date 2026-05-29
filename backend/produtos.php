<?php
include 'config.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

switch($action) {
    
    // Buscar todos os produtos
    case 'listar':
        $stmt = $pdo->query("SELECT * FROM produtos ORDER BY nome");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    // Adicionar produto
    case 'adicionar':
        $data = json_decode(file_get_contents("php://input"), true);
        
        $stmt = $pdo->prepare("INSERT INTO produtos (id, nome, categoria, preco, stock) VALUES (?, ?, ?, ?, ?)");
        $success = $stmt->execute([
            $data['id'],
            $data['nome'],
            $data['categoria'],
            $data['preco'],
            $data['stock']
        ]);
        
        echo json_encode(['success' => $success]);
        break;

    // Atualizar produto
    case 'atualizar':
        $data = json_decode(file_get_contents("php://input"), true);
        
        $stmt = $pdo->prepare("UPDATE produtos SET nome=?, categoria=?, preco=?, stock=? WHERE id=?");
        $success = $stmt->execute([
            $data['nome'],
            $data['categoria'],
            $data['preco'],
            $data['stock'],
            $data['id']
        ]);
        
        echo json_encode(['success' => $success]);
        break;

    // Eliminar produto
    case 'eliminar':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM produtos WHERE id = ?");
        $success = $stmt->execute([$id]);
        echo json_encode(['success' => $success]);
        break;
}
?>