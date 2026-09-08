<?php
session_start();
// Bütün oturum değişkenlerini temizle
session_unset();
// Oturumu tamamen sonlandır
session_destroy();
// Giriş sayfasına yönlendir
header("Location: index.php");
exit;
?>
