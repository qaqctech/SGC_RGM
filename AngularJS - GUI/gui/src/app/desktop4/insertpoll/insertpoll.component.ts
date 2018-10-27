// import { User } from './desktop3/user';
import { Encuesta } from './encuesta';
import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;
import { UserServiceService } from '../.././user-service.service'; // Importamos nuestro servicio
import { Pregunta } from './pregunta';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-insertpoll',
  templateUrl: './insertpoll.component.html',
  styleUrls: ['./insertpoll.component.css']
})
export class InsertpollComponent {
  next: number;
  tipo: number;
  respuesta: number;
  listo: boolean;
  numero: number;
  name;
  preparado: boolean;
  pregunuta;
  splitted;
  fecha;
  tipo2;
  cadena;
  admin;
  coordinador;
  liderdeproceso;
  usuariodemo;
  constructor(private crudProducto: UserServiceService) {
    this.next = 0;
    this.respuesta = 1;
    this.listo = false;
    this.numero = 1;
    this.pregunuta = new Pregunta();
    this.pregunuta.clean();
    this.preparado = false;

  }

  guardarEncuesta() {
    if ($('#date').val() !== '' && $('#encuesta').val() !== '') {
      this.splitted = $('#date').val().split('-', 3);
      this.fecha = this.splitted[0] + '-' + this.splitted[1] + '-' + this.splitted[2];
      if ($('input:checkbox[name=administrador]').prop('checked')) {
        this.admin = 'true';
      } else {
        this.admin = 'false';
      }
      if ($('input:checkbox[name=coordinador]').prop('checked')) {
        this.coordinador = 'true';
      } else {
        this.coordinador = 'false';
      }
      if ($('input:checkbox[name=lider]').prop('checked')) {
        this.liderdeproceso = 'true';
      } else {
        this.liderdeproceso = 'false';
      }
      if ($('input:checkbox[name=usersn]').prop('checked')) {
        this.usuariodemo = 'true';
      } else {
        this.usuariodemo = 'false';
      }

      this.name = new Encuesta($('#nombre').val(), $('#encuesta').val(), this.fecha,
      this.admin, this.coordinador, this.liderdeproceso, this.usuariodemo);
       // alert(JSON.stringify(this.name));
      this.crudProducto.guardarEncuesta(JSON.stringify(this.name)).map(response => response.json())
       .subscribe(data => {
            if (data === 'true' || data === 'true2') {
              $('.notifi').css({ background: 'rgb(14,194,14)' });
              $('.notifi').text('Se añadió la encuesta');
              $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
                setTimeout(function () { $('.notifi').animate({ marginTop: '-100%' }, 1000); }, 5000);
              });
            } else if (data === 'false' || data === '0' || data === 'false2') {
              $('.notifi').css({ background: 'red' });
              $('.notifi').text('Se encontró un error');
              $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
                setTimeout(function () { $('.notifi').animate({ marginTop: '-100%' }, 1000); }, 5000);
              });
            } else {
              $('.notifi').css({ background: 'red' });
              $('.notifi').text('Error inesperado');
              $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
                setTimeout(function () { $('.notifi').animate({ marginTop: '-100%' }, 1000); }, 5000);
              });
            }
          this.next = 1;
        });
      } else {
        $('.notifi').css({ background: 'red' });
        $('.notifi').text('Debe registrar la fecha y el nombre');
        $('.notifi').animate({ marginTop: '2em' }, 1000, function () {
          setTimeout(function () { $('.notifi').animate({ marginTop: '-10em' }, 1000); }, 5000);
        });
      }
  }

  guardarTPregunta() {
    if ($('#tipo').val() !== '') {
      this.pregunuta.setTPregunta($('#tipo').val());
      this.next = 2;
    } else {
      this.error('Campos incompletos');
    }
  }
  guardarPregunta() {
    if ($('#tipo').val() !== '') {
      this.pregunuta.setPregunta($('#Pregunta').val());
    } else {
      this.error('Campos incompletos');
    }
  }

  error(data) {
    $('.notifi').css({ background: 'red' });
    $('.notifi').text(data);
    $('.notifi').animate({ marginTop: '2em' }, 1000, function () {
      setTimeout(function () { $('.notifi').animate({ marginTop: '-10em' }, 1000); }, 5000);
    });
  }
  guardarRespuesta(data) {
    this.next++;
    this.respuesta++;
    this.listo = true;
    switch (data) {
      case 1: {
        this.pregunuta.setR1($('#respuesta').val());
        break;
      }
      case 2: {
        this.pregunuta.setR2($('#respuesta').val());
        break;
      }
      case 3: {
        this.pregunuta.setR3($('#respuesta').val());
        break;
      }
      case 4: {
        this.pregunuta.setR4($('#respuesta').val());
        break;
      }
      case 5: {
        this.pregunuta.setR5($('#respuesta').val());
        break;
      }
      case 6: {
        if ($('#respuesta').val() === '') {
          this.respuesta--;
        }
        this.pregunuta.setnrespuesta(this.respuesta);
        this.pregunuta.setTPregunta(this.tipo2);
        this.crudProducto.guardarPregunta(JSON.stringify(this.pregunuta)).
        map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
        .subscribe(data2 => {
          if (data2 === 'true' || data2 === 'true2') {
            $('.notifi').css({ background: 'rgb(14,194,14)' });
            $('.notifi').text('Se añadió la pregunta');
            $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
              setTimeout(function () { $('.notifi').animate({ marginTop: '-10em' }, 1000); }, 5000);
            });
          } else if (data2 === 'false' || data2 === '0' || data2 === 'false2') {
            $('.notifi').css({ background: 'red' });
            $('.notifi').text('Se encontró un error');
            $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
              setTimeout(function () { $('.notifi').animate({ marginTop: '-10em' }, 1000); }, 5000);
            });
          } else {
            $('.notifi').css({ background: 'red' });
            $('.notifi').text('Error inesperado');
            $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
              setTimeout(function () { $('.notifi').animate({ marginTop: '-10em' }, 1000); }, 5000);
            });
          }
         });
        this.preparado = true;
        this.pregunuta.clean();
        this.next = 1;
        this.listo = false;
        this.respuesta = 1;
        this.numero++;
        break;
      }
    }
}
  obtenerTipo() {
    this.tipo = $('#tipo').prop('selectedIndex');
    this.tipo2 = $('#tipo').val();
  }
  pregunta() {
    if ($('#Pregunta').val() !== '') {
      if (this.tipo === 0) {
        this.pregunuta.setnrespuesta(0);
        this.crudProducto.guardarPregunta(JSON.stringify(this.pregunuta)).
          map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
          .subscribe(data2 => {
            if (data2 === 'true' || data2 === 'true2') {
              $('.notifi').css({ background: 'rgb(14,194,14)' });
              $('.notifi').text('Se añadió la pregunta de la encuesta');
              $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
                setTimeout(function () { $('.notifi').animate({ marginTop: '-100%' }, 1000); }, 5000);
              });
            } else if (data2 === 'false' || data2 === '0' || data2 === 'false2') {
              $('.notifi').css({ background: 'red' });
              $('.notifi').text('Se encontró un error');
              $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
                setTimeout(function () { $('.notifi').animate({ marginTop: '-100%' }, 1000); }, 5000);
              });
            } else {
              $('.notifi').css({ background: 'red' });
              $('.notifi').text('Pregunta existente');
              $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
                setTimeout(function () { $('.notifi').animate({ marginTop: '-100%' }, 1000); }, 5000);
              });
            }
        });
        this.pregunuta.clean();
        this.respuesta++;
        this.next = 1;
      } else {
        this.next = 3;
      }
      this.numero++;
    } else {
      this.error('Campos incompletos');
    }
  }
  aceptar() {
    this.preparado = false;
    this.pregunuta.clean();
    this.next = 0;
    this.listo = false;
    this.respuesta = 1;
    this.numero = 1;
    $('.notifi').css({ background: 'rgb(14,194,14)' });
    $('.notifi').text('Encuesta añadida con éxito');
    $('.notifi').animate({ marginTop: '4em' }, 1000, function () {
      setTimeout(function () { $('.notifi').animate({ marginTop: '-100%' }, 1000); }, 5000);
    });
  }
}
