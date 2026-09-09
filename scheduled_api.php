<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    http_response_code(401); exit;
}
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$db   = 'DATABASE-NAME';
$user = 'DATABASE-USERNAME'; // Kendi DB kullanıcı adın
$pass = 'DATABASE-PASSWORD'; // Kendi DB şifren

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
} catch (\PDOException $e) { echo json_encode(['error' => 'DB hatasi']); exit; }

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $stmt = $pdo->query('SELECT * FROM scheduled_tasks ORDER BY scheduled_time ASC');
    echo json_encode($stmt->fetchAll());
} elseif ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!empty($data['text']) && !empty($data['scheduled_time'])) {
        $stmt = $pdo->prepare('INSERT INTO scheduled_tasks (text, scheduled_time) VALUES (?, ?)');
        $stmt->execute([$data['text'], $data['scheduled_time']]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'text' => $data['text'], 'scheduled_time' => $data['scheduled_time'], 'completed' => 0]);
    }
} elseif ($method == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id']) && isset($data['completed'])) {
        $stmt = $pdo->prepare('UPDATE scheduled_tasks SET completed = ? WHERE id = ?');
        $stmt->execute([$data['completed'] ? 1 : 0, $data['id']]);
        echo json_encode(['success' => true]);
    }
} elseif ($method == 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        $stmt = $pdo->prepare('DELETE FROM scheduled_tasks WHERE id = ?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
    }
}
?>
