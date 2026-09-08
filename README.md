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
