<?php
session_start();
unset($_SESSION['login_user']);
unset($_SESSION['login_username']);
unset($_SESSION['user_type']);
header("Location: ../index.php");
?>