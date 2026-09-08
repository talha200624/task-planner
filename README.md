# 🚀 Modern Görev ve Plan Yöneticisi

Kendi sunucumda çalışması için geliştirdiğim, PHP ve MySQL tabanlı, modern arayüzlü ve güvenli bir görev takip (To-Do) ve hızlı not alma (Notepad) web uygulamasıdır.

## ✨ Özellikler

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
2. `api.php` ve `note_api.php` dosyalarındaki veritabanı bilgilerinizi kendi sunucunuza göre güncelleyin.
3. Sunucunuzda `planlar` adında bir veritabanı oluşturup gerekli tabloları içe aktarın.
4. `index.php` içindeki varsayılan giriş şifresini kendinize göre değiştirin.





# 🚀 Modern Task & Plan Manager

A modern, secure, and self-hosted task management (To-Do) and quick notepad web application built with PHP and MySQL, designed to run smoothly on custom Linux servers.

## ✨ Features

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

## 📌 Installation

1. Clone the repository.
2. Update your database credentials in the `api.php` and `note_api.php` files to match your own server.
3. Create a database named `planlar` on your server and import the required tables.
4. Change the default login password inside `index.php` to your own preference.
