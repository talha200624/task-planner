<?php
$host = 'localhost';
$db   = 'planlar';
$user = 'DATABASE-USERNAME'; // Kendi DB kullanıcı adını yaz
$pass = 'DATABASE-PASSWORD'; // Kendi DB şifreni yaz

$botToken = "TELEGRAM-BOT-TOKEN";
$chatId = "TELEGRAM-CHAT-ID";

$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);

// Saati gelmiş (veya geçmiş) ve henüz mesajı atılmamış (is_sent = 0) görevleri bul
$stmt = $pdo->query("SELECT * FROM scheduled_tasks WHERE scheduled_time <= NOW() AND is_sent = 0");
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($tasks as $task) {
    // Telegram'a gidecek mesajın formatı
    $message = "⏰ *ZAMANLI GÖREV HATIRLATICI*\n\n📌 Görev: " . $task['text'];
    
    // Telegram API URL'si
    $url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($message) . "&parse_mode=Markdown";
    
    // Mesajı gönder
    file_get_contents($url);
    
    // Aynı mesajı tekrar atmamak için veritabanında "is_sent = 1" olarak güncelle
    $update = $pdo->prepare("UPDATE scheduled_tasks SET is_sent = 1 WHERE id = ?");
    $update->execute([$task['id']]);
}
?>
