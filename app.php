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
            
            <!-- Sol Kolon: Hava Durumu ve Notlar -->
            <div class="left-column">
                
                <!-- Üst Bölüm: Hava Durumu -->
                <div class="panel weather-panel">
                    <h2><i class="fas fa-cloud-sun"></i> Hava Durumu</h2>
                    <div class="weather-input-group">
                        <input type="text" id="cityInput" value="Edirne" placeholder="Şehir adı girin...">
                        <button class="add-btn" id="getWeatherBtn"><i class="fas fa-search"></i></button>
                    </div>
                    <div id="weatherDisplay" class="weather-display">
                        <!-- Hava durumu verisi JavaScript ile buraya gelecek -->
                        <div class="empty-state">Hava durumu bekleniyor...</div>
                    </div>
                </div>

                <!-- Alt Bölüm: Hızlı Notlar -->
                <div class="panel notepad-panel">
                    <h2><i class="fas fa-book-open"></i> Hızlı Notlar</h2>
                    <textarea id="notepad" placeholder="Aklındakileri buraya yaz... Sayfayı yenilesen bile silinmez."></textarea>
                </div>

            </div>

            <!-- Sağ Kolon: Yapılacaklar Listesi -->
            <div class="panel right-panel">
                <h2><i class="fas fa-check-square"></i> Görevler</h2>
                <div class="input-group">
                    <input type="text" id="taskInput" placeholder="Örn: Yeni projeyi incele...">
                    <button class="add-btn" id="addBtn">Ekle</button>
                </div>
                <ul class="task-list" id="taskList"></ul>
                <div id="emptyState" class="empty-state" style="display: none;">Şimdilik görev yok.</div>

                <hr class="panel-divider">

                <h2><i class="fas fa-clock"></i> Zamanlı Görevler (Telegram)</h2>
                <div class="scheduled-input-group">
                    <input type="text" id="schedTaskInput" placeholder="Örn: Saat 15:00'te toplantı...">
                    <input type="datetime-local" id="schedTaskTime">
                    <button class="add-btn sched-add-btn" id="schedAddBtn">Kur</button>
                </div>
                <ul class="task-list" id="schedTaskList"></ul>
            </div>
            
        </div>
    </div>

    <div id="toastNotification" class="toast success">
        <i id="toastIcon" class="fas fa-check-circle"></i> <span id="toastText">Kaydedildi</span>
    </div>
    
    <script src="script.js?v=6"></script>
</body>
</html>
</body>
</html>
