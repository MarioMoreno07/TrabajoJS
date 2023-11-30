<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$Participantes = json_decode($_POST['Participantes']);

$sql = "INSERT INTO Participantes VALUES(null, '$Participantes->name', '$Participantes->email', '$Participantes->descripcion', '$Participantes->id_evento');";


mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta el participante", $conexion);
}
?>
