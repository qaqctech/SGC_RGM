<?php
// En versiones de PHP anteriores a la 4.1.0, deber�a utilizarse $HTTP_POST_FILES en lugar
// de $_FILES.

$dir_subida = 'documento/';
$fichero_subido = $dir_subida . basename($_FILES['archivo']['name']);

echo '<pre>';
if (move_uploaded_file($_FILES['archivo']['tmp_name'], $fichero_subido)) {
    echo "El fichero es v�lido y se subi� con �xito.\n";
} else {
    echo "�Posible ataque de subida de ficheros!\n";
}

echo 'M�s informaci�n de depuraci�n:';
print_r($_FILES);

print "</pre>";

?>