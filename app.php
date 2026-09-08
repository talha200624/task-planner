<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Görev & Plan Yöneticisi</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="dashboard">
        <!-- Üst Panel: Başlık, Saat/Tarih ve Çıkış -->
        <div class="top-bar">
            <div class="brand">
                <i class="fas fa-layer-group"></i> Planlarım
            </div>
            <div class="datetime-display" id="dateTimeDisplay">
                <!-- Saat ve tarih JS ile buraya gelecek -->
            </div>
            <div class="logout-wrapper">
                <a href="logout.php" class="logout-btn" title="Güvenli Çıkış">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </div>

        <!-- Ana İçerik: İki Kolon -->
        <div class="main-content">
            
            <!-- Sol Kolon: Not Defteri -->
            <div class="panel left-panel">
                <h2><i class="fas fa-book-open"></i> Hızlı Notlar</h2>
                <textarea id="notepad" placeholder="Aklındakileri buraya yaz... Sayfayı yenilesen bile silinmez."></textarea>
            </div>

            <!-- Sağ Kolon: Yapılacaklar Listesi -->
            <div class="panel right-panel">
                <h2><i class="fas fa-check-square"></i> Görevler</h2>
                <div class="input-group">
                    <input type="text" id="taskInput" placeholder="Örn: Yeni projeyi incele...">
                    <button class="add-btn" id="addBtn">Ekle</button>
                </div>

                <ul class="task-list" id="taskList">
                    <!-- Görevler buraya eklenecek -->
                </ul>
                <div id="emptyState" class="empty-state" style="display: none;">
                    Şimdilik yapılacak bir şey yok. Yeni bir plan ekle!
                </div>
            </div>
            
        </div>
    </div>

    <div id="toastNotification" class="toast success">
        <i id="toastIcon" class="fas fa-check-circle"></i> <span id="toastText">Kaydedildi</span>
    </div>
    
    <script src="script.js?v=4"></script>
</body>
</html>
</body>
</html>
