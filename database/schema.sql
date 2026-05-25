-- =============================================
-- BASE DE DADOS - Loja / Gestao
-- =============================================

CREATE DATABASE IF NOT EXISTS gestao_loja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gestao_loja;

-- =============================================
-- 1. TABELA UTILIZADORES
-- =============================================
CREATE TABLE utilizadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'vendedor') NOT NULL DEFAULT 'vendedor',
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_ultimo_login DATETIME NULL,
    
    INDEX idx_email (email),
    INDEX idx_tipo (tipo)
) ENGINE=InnoDB;

-- =============================================
-- 2. TABELA PRODUTOS
-- =============================================
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    preco DECIMAL(12,2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    categoria VARCHAR(100) NOT NULL,
    codigo_barra VARCHAR(50) NULL UNIQUE,
    imagem VARCHAR(255) NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_categoria (categoria),
    INDEX idx_nome (nome)
) ENGINE=InnoDB;

-- =============================================
-- 3. TABELA VENDAS
-- =============================================
CREATE TABLE vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilizador_id INT NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    desconto DECIMAL(10,2) DEFAULT 0.00,
    valor_final DECIMAL(12,2) NOT NULL,
    metodo_pagamento ENUM('dinheiro', 'cartao', 'mpesa', 'transferencia', 'outro') NOT NULL,
    estado ENUM('concluida', 'pendente', 'cancelada') DEFAULT 'concluida',
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT NULL,
    
    FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE RESTRICT,
    
    INDEX idx_data_venda (data_venda),
    INDEX idx_utilizador (utilizador_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB;

-- =============================================
-- 4. TABELA ITENS_VENDA (MUITO IMPORTANTE)
-- =============================================
CREATE TABLE itens_venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    
    FOREIGN KEY (venda_id) REFERENCES vendas(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE RESTRICT,
    
    INDEX idx_venda (venda_id),
    INDEX idx_produto (produto_id)
) ENGINE=InnoDB;

-- =============================================
-- 5. TABELA MOVIMENTACOES_STOCK
-- =============================================
CREATE TABLE movimentacoes_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    quantidade INT NOT NULL,
    motivo VARCHAR(150) NULL,           -- Ex: "Venda", "Compra", "Ajuste", "Devolução"
    venda_id INT NULL,                  -- Se for saída por venda
    observacoes TEXT NULL,
    data_movimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    utilizador_id INT NULL,
    
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE RESTRICT,
    FOREIGN KEY (venda_id) REFERENCES vendas(id) ON DELETE SET NULL,
    FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE SET NULL,
    
    INDEX idx_produto_tipo (produto_id, tipo),
    INDEX idx_data_movimento (data_movimento)
) ENGINE=InnoDB;

-- =============================================
-- TRIGGERS (Muito importantes para consistência)
-- =============================================

-- Atualiza stock automaticamente quando há uma saída por venda
DELIMITER //

CREATE TRIGGER after_itens_venda_insert 
AFTER INSERT ON itens_venda
FOR EACH ROW
BEGIN
    UPDATE produtos 
    SET quantidade = quantidade - NEW.quantidade 
    WHERE id = NEW.produto_id;
    
    -- Registra movimentação de stock
    INSERT INTO movimentacoes_stock 
        (produto_id, tipo, quantidade, motivo, venda_id, utilizador_id)
    VALUES 
        (NEW.produto_id, 'saida', NEW.quantidade, 'Venda', NEW.venda_id, 
         (SELECT utilizador_id FROM vendas WHERE id = NEW.venda_id));
END//

-- Atualiza valor_final da venda quando insere item
CREATE TRIGGER before_itens_venda_insert 
BEFORE INSERT ON itens_venda
FOR EACH ROW
BEGIN
    SET NEW.subtotal = NEW.quantidade * NEW.preco_unitario;
END//

DELIMITER ;

-- =============================================
-- VIEWS ÚTEIS
-- =============================================

-- View para relatório de vendas
CREATE VIEW vw_vendas_detalhadas AS
SELECT 
    v.id AS venda_id,
    v.data_venda,
    u.nome AS vendedor,
    p.nome AS produto,
    iv.quantidade,
    iv.preco_unitario,
    iv.subtotal,
    v.total,
    v.valor_final
FROM vendas v
JOIN utilizadores u ON v.utilizador_id = u.id
JOIN itens_venda iv ON v.id = iv.venda_id
JOIN produtos p ON iv.produto_id = p.id;