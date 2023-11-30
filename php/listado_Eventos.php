<?php
require_once('config.php');
$conexion = obtenerConexion();

// SQL
$sql = "SELECT * FROM Eventos;";

$resultado = mysqli_query($conexion, $sql);

$datos = array(); // Inicializar el array antes del bucle

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, false, "Datos recuperados", $conexion);
?>
