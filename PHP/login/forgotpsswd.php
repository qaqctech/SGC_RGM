<?php
    include 'Security.php';
    include 'Conexion.php';


	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require '../PHPMailer/Exception.php';
	require '../PHPMailer/PHPMailer.php';
	require '../PHPMailer/SMTP.php';

    $con = new mysqli($host, $user, $pass, $db);
	$char='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	$long=strlen($char)-1;
	$j[0]=0;
	for($i=0;$i<9;$i++){
		$c=rand(0,$long);
		$n=$char[$c];
		$j[0].=$n;
	}
	$crp = $j[0];
	$crip = encrypt($j[0],$key);

	$user = $_POST['user'];
	$email = $_POST['email'];
	$query = $con->query("SELECT email, nombre FROM empleado WHERE cedula ='$user'");

	while($r = $query -> fetch_array(MYSQLI_ASSOC)){
		if($r['email'] == $email){
			$con->query("UPDATE cuenta SET contrasena='$crip', estado='Espera' WHERE cedula=$user");
			$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
			$nombre = $r['nombre'];
			try {
				//Server settings
				$mail->SMTPDebug = 2;                                 // Enable verbose debug output
				$mail->isSMTP();                                      // Set mailer to use SMTP// Specify main and backup SMTP servers
				$mail->SMTPAuth = true;                               // Enable SMTP authentication
				$mail->Username = 'contactsgc246@gmail.com';                 // SMTP username
				$mail->Password = 'LrQ2KSSeJ6El';                           // SMTP password
				//Set the hostname of the mail server
				$mail->Host = 'smtp.gmail.com';
				//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
				$mail->Port = 587;
				//Set the encryption system to use - ssl (deprecated) or tls
				$mail->SMTPOptions = array(
					'ssl' => array(
						'verify_peer' => false,
						'verify_peer_name' => false,
						'allow_self_signed' => true
					)
				);
				//Whether to use SMTP authentication
				$mail->SMTPAuth = true;                             // TCP port to connect to
				$mail->CharSet = 'UTF-8';
				//Recipients
				$mail->setFrom('felipeflogxd@gmail.com', 'Sistema SGC');
				//$mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
			
				$mail->addAddress($email);               // Name is optional
				
				//$mail->addReplyTo('info@example.com', 'Information');
				//$mail->addCC('cc@example.com');
				//	$mail->addBCC('bcc@example.com');
				//	$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
				///	$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
				$mail->AddEmbeddedImage('../dist/assets/img/sgc.png', 'logo_2u');
				//Content
				$mail->isHTML(true);                                  // Set email format to HTML
				$mail->Subject = '¿OLVIDASTE TU CONTRASEÑA?';
								$mail->Body = " 

<html>

<body style= \"background: #000; color: #fff; padding: 19px; text-align: center;\">
    <header style =\"font-family:\'Sans Serif\';\">
        <img style = \"max-width: 250px;\" src='cid:logo_2u' />
        <h1 style= \" color: #ffffff; font-size:22px;\">
            <strong style= \"color: #ffffff;\">¡Enhorabuena!</strong> $nombre <br><br>
        Hemos recibido tu solicitud para cambiar de contraseña.</h1>
    </header>

    <main style= \"color: ##FBF2EF; font-size: 22px; border: 1px;\">
        <h3 style= \"color: #fff; font-size: 22px;\">
            Al iniciar sesión te pediremos que cambies tu contraseña por seguridad.
            <br>
            Tu contraseña es:
			 </h3>
            <br>
            <div style= \"width: 100%; max-width: 320px; margin: auto; border-radius: 5px; padding: 10px; background: #04FF00; color: #fff\">
                <b style = \"font-size: 22px;\">$crp</b>
            </div>
    </main>
    <br><br>
    <a style = \"font-size: 22px; background: black; color: white; border: 1px solid white; border-radius: 5px; padding: 10px; text-decoration: none; padding-right: 16px; padding-left: 16px; \" href = \"http://www.andreslargo.com/sgc/login.html\"> Inicia sesión </a>
	
    <p style = \"font-size: 22px; color: #fff;\">Cordialmente, SGC.</p>
</body>

</html>";
				$mail->AltBody = '¿Olvidaste tu contraeña?';

				$mail->send();
				//echo 'true';
			} catch (Exception $e) {
				echo $e;
			}

		}
		else{
			echo "false";
		}

	}

?>
