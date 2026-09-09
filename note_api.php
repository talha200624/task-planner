<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    http_response_code(401);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$db   = 'DATABASE-NAME';
$user = 'DATABASE-USERNAME'; // Kendi kullanıcı adını yaz
$pass = 'DATABASE-PASSWORD'; // Kendi şifreni yaz
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Veritabanı bağlantı hatası']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Kayıtlı notu getir
    $stmt = $pdo->query('SELECT content FROM notes WHERE id = 1');
    $note = $stmt->fetch();
    echo json_encode(['content' => $note ? $note['content'] : '']);
} 
elseif ($method == 'POST') {
    // Notu güncelle
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['content'])) {
        $stmt = $pdo->prepare('UPDATE notes SET content = ? WHERE id = 1');
        $stmt->execute([$data['content']]);
        echo json_encode(['success' => true]);
    }
}
?>
