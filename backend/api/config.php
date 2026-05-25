<?php

/* =========================================
   HEADERS DA API
========================================= */

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

/* =========================================
   CONFIGURAÇÃO DA BASE DE DADOS
========================================= */

$host = "localhost";
$user = "root";
$pass = "";
$db   = "loja_online";

/* =========================================
   CONEXÃO MYSQL
========================================= */

$conn = mysqli_connect(
    $host,
    $user,
    $pass,
    $db
);

/* =========================================
   VERIFICAR CONEXÃO
========================================= */

if(!$conn){

    echo json_encode([

        "success" => false,
        "message" => "Erro na conexão com a base de dados"

    ]);

    exit;
}

/* =========================================
   UTF-8
========================================= */

mysqli_set_charset($conn, "utf8mb4");

?>