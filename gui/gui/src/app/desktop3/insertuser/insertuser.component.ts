import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../.././user-service.service'; // Importamos nuestro servicio
import 'rxjs/add/operator/map';
import { Hero } from '../hero';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-insertuser',
  templateUrl: './insertuser.component.html',
  styleUrls: ['./insertuser.component.css']
})
export class InsertuserComponent {
  listado;
  listado2;
  hero;
  constructor(private crudProducto: UserServiceService) {
    this.crudProducto
    .registrar(1) // Llamamos a la funcion <strong>listar</strong> de nuestro servicio
    .map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
    .subscribe(data => {
    this.listado = data; // Asignamos nuestros datos mapeados a una variable
    });
    this.crudProducto
    .registrar(2) // Llamamos a la funcion <strong>listar</strong> de nuestro servicio
    .map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
    .subscribe(data => {
    this.listado2 = data; // Asignamos nuestros datos mapeados a una variable
    });
   }
   send() {
      this.hero = new Hero($('#cedula').val(), $('#nombre').val(), $('#apellido').val(), $('#telefono').val()
      , $('#correo').val(), $('#direccion').val(), $('#numero').val(), $('input:radio[name=gender]:checked').val(),
      $('#listado :selected').text(), $('#listado2 :selected').text());
      this.crudProducto.insertar(this.hero)
      .map(response => response.json()) // Mapeamos los datos devueltos por nuestro archivo php
      .subscribe(data => {
      alert('hey estos son los datos:' + data); // Asignamos nuestros datos mapeados a una variable
    });
   }

}
