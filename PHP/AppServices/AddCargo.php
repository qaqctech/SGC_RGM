<?php

require_once 'Connection/Conexion.php';

if(!isset($_GET['opt'])) {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $Nombre = $input['nombre'];
        $Nivel = $input['permiso'];

        $con = new mysqli($host, $user, $pass, $db);
        $con->query("SET NAMES 'utf8'");
        if ($con->connect_error) {
            echo json_encode('false');
        }

        $query1="SELECT * FROM cargo WHERE nombre = '$Nombre'";
        
        $resultado = $con->query($query1);

        if ($resultado->num_rows>0) {
            echo json_encode('false');//significa que el cargo ya existe 
        }
        else{
        $lvl =4;
        if($Nivel=='Nivel 1') {$lvl =1;}
        if($Nivel=='Nivel 2') {$lvl =2;}
        if($Nivel=='Nivel 3') {$lvl =3;}
        if($Nivel=='Nivel 4') {$lvl =4;}
            $query = "INSERT INTO cargo VALUES (0, '$Nombre', $lvl)";
            $rs = $con->query($query);
            if ($rs) {
                echo json_encode('true');
                }
                else {
                    echo json_encode('false');
                }
            }
        }
    
?>
