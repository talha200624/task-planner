# 🚀 Modern Görev ve Plan Yöneticisi (Task & Plan Manager)

🇹🇷 **Türkçe Dokümantasyon aşağıdadır.**
🇬🇧 **English documentation is available below.**

--- 

## 🇹🇷 Türkçe

Kendi sunucumda çalışması için geliştirdiğim, PHP ve MySQL tabanlı, modern arayüzlü ve **Telegram bildirim entegrasyonuna** sahip güvenli bir görev takip ve hızlı not alma web uygulamasıdır.

## ✨ Özellikler

*   **Zamanlı Görevler & Telegram Botu:** Belirtilen saat geldiğinde arka planda çalışan Cron Job (Zamanlayıcı) sayesinde Telegram üzerinden anlık bildirim gönderir.
*   **Modern ve Koyu Tema (Dark Mode):** Göz yormayan, 'Inter' fontuyla desteklenmiş UI/UX tasarımı.
*   **Akıllı Not Defteri:** Kullanıcı yazmayı bıraktıktan 1 saniye sonra (Debounce yöntemiyle) verileri yormadan buluta otomatik kaydeder.
*   **Dinamik Bildirim Sistemi (Toast):** Görev eklendiğinde, silindiğinde veya not kaydedildiğinde renkli anlık bildirimler sunar.
*   **Güvenli Oturum Yönetimi:** Sayfaya izinsiz erişimleri engelleyen, PHP Session tabanlı özel bir Login (Giriş) ekranı.
*   **Siber Güvenlik Odaklı Veritabanı:** SQL Injection saldırılarına karşı tam koruma sağlayan PDO (PHP Data Objects) mimarisi.

## 🛠️ Kullanılan Teknolojiler

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
*   **Backend:** PHP (RESTful API mantığı ile)
*   **Veritabanı:** MySQL / MariaDB
*   **Sunucu:** Apache (Fedora Server)

## 📌 Kurulum

1. Depoyu klonlayın.
2. `api.php`, `note_api.php`, `scheduled_api.php` ve `telegram_cron.php` dosyalarındaki Database ve Bot bilgilerinizi güncelleyin.
3. Sunucunuzda `planlar` veritabanını oluşturup şu SQL komutlarını çalıştırın:
   ```mysql
   CREATE DATABASE planlar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE planlar;

   CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255) NOT NULL, completed TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
   CREATE TABLE notes (id INT PRIMARY KEY, content TEXT);
   INSERT INTO notes (id, content) VALUES (1, '');
   CREATE TABLE scheduled_tasks (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255) NOT NULL, scheduled_time DATETIME NOT NULL, is_sent TINYINT(1) DEFAULT 0, completed TINYINT(1) DEFAULT 0);

4. `index.php` içindeki varsayılan giriş şifresini kendinize göre değiştirin.
5. Telegram bildirimlerinin çalışması için sunucunuza şu Cron görevini ekleyin:
 ```
 * * * * * /usr/bin/php /var/www/html/telegram_cron.php
```


## 🇬🇧 English

# 🚀 Modern Task & Plan Manager

A modern, secure, and self-hosted task management (To-Do) and quick notepad web application built with PHP and MySQL, featuring **Telegram bot notifications**.

## ✨ Features

*   **Scheduled Tasks & Telegram Bot:** Sends instant notifications via Telegram when a scheduled task's time arrives, powered by a backend Cron Job.
*   **Modern Dark Mode UI:** Clean, distraction-free interface styled with the 'Inter' font and tailored for productivity.
*   **Smart Cloud Notepad:** Automatically saves your notes to the database 1 second after you stop typing (using the Debounce technique) to protect against data loss.
*   **Dynamic Toast Notifications:** Instant, color-coded visual feedback for every action (adding tasks, deleting items, or saving notes).
*   **Secure Session Authentication:** Custom PHP session-based login screen preventing unauthorized access.
*   **Security-First Backend:** Robust PDO (PHP Data Objects) architecture protecting against SQL Injection vulnerabilities.

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
*   **Backend:** PHP (RESTful API architecture)
*   **Database:** MySQL / MariaDB
*   **Server:** Apache (Fedora Server)

---

## 📌 Installation & Database Setup

1. Clone the repository.
2. Update your Database credentials and Telegram Bot Tokens in `api.php`, `note_api.php`, `scheduled_api.php`, and `telegram_cron.php`.
3. Create a database named `planlar` and run the SQL commands.
   ```mysql
   CREATE DATABASE planlar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE planlar;

   CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255) NOT NULL, completed TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
   CREATE TABLE notes (id INT PRIMARY KEY, content TEXT);
   INSERT INTO notes (id, content) VALUES (1, '');
   CREATE TABLE scheduled_tasks (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255) NOT NULL, scheduled_time DATETIME NOT NULL, is_sent TINYINT(1) DEFAULT 0, completed TINYINT(1) DEFAULT 0);
  
4. Change the default login password inside `index.php` to your own preference.
5. To enable Telegram notifications, add the following cron job to your server:
   ```
   * * * * * /usr/bin/php /var/www/html/telegram_cron.php
   ```
