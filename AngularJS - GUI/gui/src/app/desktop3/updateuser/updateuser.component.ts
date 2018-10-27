import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../.././user-service.service';
import { Hero } from '../hero';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  visible: boolean;
  listado;
  listado2;
  listado3;
  hero;
  cargo: string;
  seccional: string;
  check: boolean;
  check2: boolean;
  constructor(private crudProducto: UserServiceService) {
    this.visible = false;
   }
   busca2() {
    this.crudProducto.busca($('#cc').val()).map(response => response.json())
    .subscribe(data => {
      if (data === 'nel') {

      } else {
        this.check = false;
        this.listado = data;
          this.crudProducto
            .registrar(1) // Llamamos a la funcion <strong>listar</strong> de nuestro servicio
            .map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
            .subscribe(data2 => {
              this.listado2 = data2; // Asignamos nuestros datos mapeados a una variable
            });
          this.crudProducto
            .registrar(2) // Llamamos a la funcion <strong>listar</strong> de nuestro servicio
            .map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
            .subscribe(data3 => {
              this.listado3 = data3; // Asignamos nuestros datos mapeados a una variable
            });
            this.visible = true;
          for (const item of data) {
          $('#cedula').val(item.cedula);
          $('#nombre').val(item.nombre);
          $('#apellido').val(item.apellido);
          $('#correo').val(item.email);
          $('#telefono').val(item.telefono);
          $('#direccion').val(item.direccion);
          $('#numero').val(item.numero);
          if (item.sexo === 'm') {
            $('input:radio[name="gender"]')
              .filter('[value = "Hombre"]')
              .prop('checked', true);
          } else if (item.sexo === 'f') {
            $('input:radio[name="gender"]')
              .filter('[value = "Mujer"]')
              .prop('checked', true);
          } else {
            $('input:radio[name="gender"]')
              .filter('[value = "Otro"]')
              .prop('checked', true);
          }
          this.seccional = item.seccional;
          this.cargo = item.cargo;
        }


      }
    });
   }
   busca() {
    this.crudProducto.busca($('#cc').val()).map(response => response.json())
    .subscribe(data => {
      if (data === 'nel') {
       $('.notifi').css({background: 'red'});
        $('.notifi').text('El usuario no existe');
        $('.notifi').animate({marginTop: '2em'}, 1000, function() {
          setTimeout(function() { $('.notifi').animate({marginTop: '-10em'}, 1000); } , 5000);
        });
      } else if (data === 'errorquery') {
       $('.notifi').css({background: 'red'});
        $('.notifi').text('Contacte al desarollador');
        $('.notifi').animate({marginTop: '2em'}, 1000, function() {
          setTimeout(function() { $('.notifi').animate({marginTop: '-10em'}, 1000); } , 5000);
        });
      } else {
        this.listado = data;
          this.crudProducto
            .registrar(1) // Llamamos a la funcion <strong>listar</strong> de nuestro servicio
            .map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
            .subscribe(data2 => {
              this.listado2 = data2; // Asignamos nuestros datos mapeados a una variable
            });
          this.crudProducto
            .registrar(2) // Llamamos a la funcion <strong>listar</strong> de nuestro servicio
            .map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
            .subscribe(data3 => {
              this.listado3 = data3; // Asignamos nuestros datos mapeados a una variable
            });
            this.visible = true;
          for (const item of data) {
          $('#cedula').val(item.cedula);
          $('#nombre').val(item.nombre);
          $('#apellido').val(item.apellido);
          $('#correo').val(item.email);
          $('#telefono').val(item.telefono);
          $('#direccion').val(item.direccion);
          $('#numero').val(item.numero);
          if (item.genero === 'm') {
            $('input:radio[name="gender"]')
              .filter('[value = "male"]')
              .prop('checked', true);
          } else if (item.genero === 'f') {
            $('input:radio[name="gender"]')
              .filter('[value = "female"]')
              .prop('checked', true);
          } else {
            $('input:radio[name="gender"]')
              .filter('[value = "other"]')
              .prop('checked', true);
          }
        }
        this.busca2();

      }
    });
   }

   updatea() {
    this.hero = new Hero($('#cedula').val(), $('#nombre').val(), $('#apellido').val(), $('#telefono').val()
    , $('#correo').val(), $('#direccion').val(), $('#numero').val(), $('input:radio[name=gender]:checked').val(),
    $('#listado :selected').text(), $('#listado2 :selected').text());
    this.crudProducto.actualiza(this.hero).map(response => response.json())
    .subscribe(data => {
      if (data === 'false') {
        $('.notifi').css({background: 'red'});
        $('.notifi').text('Ocurrió una tragedia');
        $('.notifi').animate({marginTop: '2em'}, 1000, function() {
          setTimeout(function() { $('.notifi').animate({marginTop: '-10em'}, 1000);
        } , 5000);
        });
      } else if (data === 'true') {
        $('.notifi').css({background: 'rgb(14, 194, 14)'});
        $('.notifi').text('Actualización exitosa');
        this.visible = false;
        $('.notifi').animate({marginTop: '3em'}, 1000, function() {
          setTimeout(function() { $('.notifi').animate({marginTop: '-10em'}, 1000);
         } , 5000);
        });
      }
    });
   }


}
