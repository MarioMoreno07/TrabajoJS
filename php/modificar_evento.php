<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$Eventos = json_decode($_POST['Eventos']);

$sql = "UPDATE Eventos
SET nombre = '" . $Eventos->nombre . "', 
fecha = '" .  $Eventos->fecha . "', 
ubicacion = '" . $Eventos->ubicacion . "',
descripcion = '" . $Eventos->descripcion . "'
WHERE id = $Eventos->id ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el componente", $conexion);
}
?>