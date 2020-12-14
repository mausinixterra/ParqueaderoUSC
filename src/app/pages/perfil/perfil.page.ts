import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private storage: Storage
  ) { }

  datos          : any;
  identificacion : string;
  nombre         : string;
  apellido       : string;
  correo         : string;
  telefono       : string;
  tipo           : string;

  ngOnInit() {
    this.storage.get('session_storage').then((res)=>{
      this.datos          = res;
      this.tipo           = this.datos.tipo;
      this.identificacion = this.datos.identificacion;
      this.nombre         = this.datos.nombre;
      this.apellido       = this.datos.apellido;
      this.correo         = this.datos.correo;
      this.telefono       = this.datos.telefono;
    });
  }

}