<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Yetkisiz erisim']);
    exit;
}
// Veri alışverişini JSON formatında yapacağımızı belirtiyoruz
header("Content-Type: application/json; charset=UTF-8");

// KENDİ VERİTABANI BİLGİLERİNİ BURAYA GİR
$host = 'localhost';
$db   = 'DATABASE-NAME';
$user = 'DATABASE-USERNAME';
$pass = 'DATABASE-PASSWORD';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false, // SQL Injection'a karşı tam koruma sağlar
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Veritabanı bağlantı hatası']);
    exit;
}

// Gelen isteğin türünü al (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Görevleri listele (En son eklenen en üstte)
    $stmt = $pdo->query('SELECT * FROM tasks ORDER BY created_at DESC');
    echo json_encode($stmt->fetchAll());
} 
elseif ($method == 'POST') {
    // Yeni görev ekle
    $data = json_decode(file_get_contents('php://input'), true);
    if(isset($data['text']) && !empty(trim($data['text']))) {
        $stmt = $pdo->prepare('INSERT INTO tasks (text, completed) VALUES (?, 0)');
        $stmt->execute([trim($data['text'])]);
        // Eklenen görevin ID'sini geri döndür
        echo json_encode(['id' => $pdo->lastInsertId(), 'text' => $data['text'], 'completed' => 0]);
    }
} 
elseif ($method == 'PUT') {
    // Görevin durumunu güncelle (Tamamlandı / Tamamlanmadı)
    $data = json_decode(file_get_contents('php://input'), true);
    if(isset($data['id'])) {
        $stmt = $pdo->prepare('UPDATE tasks SET completed = ? WHERE id = ?');
        $stmt->execute([$data['completed'] ? 1 : 0, $data['id']]);
        echo json_encode(['success' => true]);
    }
} 
elseif ($method == 'DELETE') {
    // Görevi sil
    $data = json_decode(file_get_contents('php://input'), true);
    if(isset($data['id'])) {
        $stmt = $pdo->prepare('DELETE FROM tasks WHERE id = ?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
    }
}
?>
