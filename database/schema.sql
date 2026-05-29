-- =============================================
-- CRIAÇÃO DA BASE DE DADOS - LIMPA
-- =============================================

CREATE DATABASE IF NOT EXISTS gestao_loja1 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE gestao_loja1;

-- =============================================
-- TABELA DE UTILIZADORES
-- =============================================
CREATE TABLE utilizadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo ENUM('Administrador', 'Vendedor') NOT NULL DEFAULT 'Vendedor',
    estado ENUM('Ativo', 'Inativo') DEFAULT 'Ativo',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELA DE PRODUTOS
-- =============================================
CREATE TABLE produtos (
    id VARCHAR(10) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria VARCHAR(50),
    preco DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- DADOS DE TESTE
-- =============================================

-- Administrador (Senha: 1234)
INSERT INTO utilizadores (nome, username, senha, cargo) 
VALUES('Administrador', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador');

-- Produtos de teste
INSERT INTO produtos (id, nome, categoria, preco, stock) VALUES
('P001', 'Teclado Mecânico', 'Eletrónicos', 12500.00, 15),
('P002', 'Camiseta Preta', 'Roupa', 4500.00, 48),
('P003', 'Arroz 5kg', 'Alimentos', 3200.00, 23),
('P004', 'Coca-Cola 2L', 'Bebidas', 1800.00, 67);

SELECT 'Base de dados criada com sucesso!' AS Mensagem;