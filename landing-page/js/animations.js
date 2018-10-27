$(document).ready(function () {
    $(window).scroll(function(){
        if($(this).scrollTop() > 60){
            $("header .barra").attr('class', 'barraFixed');
        } else {
            $("header .barraFixed").attr('class', 'barra');
        }
    });
    $('#formulario').submit(function (e) {
        $.ajax({
            type: 'POST',
            url: 'login/login.php?auth=1',
            data: $('#formulario').serialize(),
            success: function (data) {
                $('main .cont .noti').fadeIn(2000);
                if (data == 'true') {
                    $('main .cont .noti').css('background', '#62E246');
                    $('main .cont .noti').html('<p>Autenticación exitosa...</p>');
                    $('main .cont h1').css('marginBottom', '0.5%');
                    setTimeout(function () {
                        $('#user').val("");
                        $('#pass').val("");
                        location.href = "gui/gui/dist/index.html";
                    }, 1500);
                } else if (data == 'false') {
                    $('main .cont .noti').css('background', 'red');
                    $('main .cont .noti').html('Intente de nuevo.');
                    setTimeout(function () {
                        $('#pass').val("");
                        $('main .cont .noti').fadeOut(1000);
                    }, 1500);
                } else {
                    $('main .cont .noti').css('background', 'red');
                    $('main .cont .noti').html('La cuenta ' + $('#user').val() + ' no existe.');
                    setTimeout(function () {
                        $('#pass').val("");
                        $('main .cont .noti').fadeOut(1000);
                    }, 2200);
                }
            },
            error: function (data) {
                $('main .cont .noti').css('background', 'red');
                $('main .cont .noti').html('¡Lo sentimos! Tus datos se han quedado en el limbo, reinicia la página e intenta de nuevo.');
                $('main .cont .noti').css('display', 'block');
            }
        });
        e.preventDefault();
    });

    $('#forgot').submit(function (e) {
        $.ajax({
            type: 'POST',
            url: 'login/forgotpsswd.php',
            data: $('#forgot').serialize(),
            success: function (data) {
                $('main .cont .noti').fadeIn(2000);
                if (data == 'true') {
                    $('main .cont .noti').css('background', '#62E246');
                    $('main .cont .noti').text('Actualización exitosa...');
                    setTimeout(function () {
                        $('#user').val("");
                        $('#email').val("");
                    }, 1500);
                } else if (data == 'false') {
                    $('main .cont .noti').css('background', 'red');
                    $('main .cont .noti').html('Intente de nuevo.');
                    setTimeout(function () {
                        $('#email').val("");
                        $('main .cont .noti').fadeOut(1000);
                    }, 1500);
                } else {

                    $('main .cont .noti').css('background', 'red');
                    $('main .cont .noti').html('La cuenta ' + $('#user').val() + ' no existe.');
                    setTimeout(function () {
                        $('#email').val("");
                        $('main .cont .noti').fadeOut(1000);
                    }, 2200);
                }
            },
            error: function (data) {
                $('main .cont .noti').css('background', 'red');
                $('main .cont .noti').html('¡Lo sentimos! Tus datos se han quedado en el limbo, reinicia la página e intenta de nuevo.');
                $('main .cont .noti').css('display', 'block');
            }
        });
        e.preventDefault();
    });

    $('#formulario2').submit(function (e) {
        $.ajax({
            type: 'POST',
            url: '../login/email.php',
            data: $('#formulario2').serialize(),
            success: function (data) {
                $('#contacto .contenedor .padre .cont .alert').fadeIn(500);
                if (data == 'true') {
                    $('#contacto .contenedor .padre .cont .alert').css('background', '#62E246');
                    $('#contacto .contenedor .padre .cont .alert').html('¡El mensaje se ha ido a viajar a nuestro servidor! Gracias.');
                    setTimeout(function () {
                        $('#nombre').val("");
                        $('#correo').val("");
                        $('#mensaje').val("");
                        $('#contacto .contenedor .padre .cont .alert').css('display', 'none');
                    }, 6500);
                } else if (data == 'false') {
                    $('#contacto .contenedor .padre .cont .alert').css('background', 'red');
                    $('#contacto .contenedor .padre .cont .alert').html('Se ha encontrado un terrible error en el área 52 de nuestro código ¡Lo sentimos!');
                }
            },
            error: function (data) {
                $('#contacto .contenedor .padre .cont .alert').css('background', 'red');
                $('#contacto .contenedor .padre .cont .alert').html('¡Lo sentimos! Tus datos se han quedado en el limbo, reinicia la página e intenta de nuevo.');
                $('#contacto .contenedor .padre .cont .alert').css('display', 'block');
            }
        });
        e.preventDefault();
    });
});
