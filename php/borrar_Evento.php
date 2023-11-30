<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$id = $_POST['id'];

// SQL
$sql = "DELETE FROM Eventos WHERE id = $id;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);
