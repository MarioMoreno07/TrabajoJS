<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$nombre=$_POST['nombre'];
$fecha=$_POST['fecha'];
$ubicacion=$_POST['ubicacion'];
$descripcion = $_POST['descripcion'];

$sql = "INSERT INTO Eventos VALUES (null,'$nombre','$fecha','$ubicacion','$descripcion');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha insertado el evento", $conexion);
}

?>