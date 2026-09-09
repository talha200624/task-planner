<?php
session_start();

// Zaten giriş yapılmışsa direkt uygulamaya yönlendir
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    header("Location: app.php");
    exit;
}

$error = '';

// Giriş bilgileri
$kullanici_adi_dogru = 'WEBSITE-USERNAME';
$sifre_dogru = 'WEBSITE-PASSWORD'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if ($username === $kullanici_adi_dogru && $password === $sifre_dogru) {
        $_SESSION['loggedin'] = true;
        header("Location: app.php");
        exit;
    } else {
        $error = "Hatalı kullanıcı adı veya şifre!";
    }
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giriş Yap</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .login-container { background-color: #1e293b; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 100%; max-width: 400px; text-align: center; }
        h2 { margin-bottom: 25px; font-weight: 600; font-size: 1.8rem; }
        .input-group { margin-bottom: 20px; text-align: left; }
        .input-group label { display: block; margin-bottom: 8px; color: #94a3b8; font-size: 0.9rem; }
        .input-group input { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid #334155; background-color: rgba(15, 23, 42, 0.6); color: #f8fafc; font-size: 1rem; outline: none; transition: border 0.3s; }
        .input-group input:focus { border-color: #3b82f6; }
        .login-btn { width: 100%; background-color: #3b82f6; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s; margin-top: 10px; }
        .login-btn:hover { background-color: #2563eb; }
        .error-msg { color: #ef4444; margin-bottom: 15px; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Hoş Geldin</h2>
        <?php if($error != ''): ?>
            <div class="error-msg"><?php echo $error; ?></div>
        <?php endif; ?>
        <form method="POST" action="index.php">
            <div class="input-group">
                <label>Kullanıcı Adı</label>
                <input type="text" name="username" required>
            </div>
            <div class="input-group">
                <label>Şifre</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit" class="login-btn">Giriş Yap</button>
        </form>
    </div>
</body>
</html>
