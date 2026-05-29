<?php
include 'config.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch($action) {
    
    case 'listar':
        $stmt = $pdo->query("SELECT * FROM produtos ORDER BY nome");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'atualizar':
        $data = json_decode(file_get_contents("php://input"), true);
        
        $stmt = $pdo->prepare("UPDATE produtos SET stock = ? WHERE id = ?");
        $success = $stmt->execute([$data['stock'], $data['id']]);
        
        echo json_encode(['success' => $success]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Ação inválida']);
}
?>