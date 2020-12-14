import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';


@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.page.html',
  styleUrls: ['./cambiar-pass.page.scss'],
})
export class CambiarPassPage implements OnInit {

  datos          : any;
  identificacion : string;
  contrasenia    : string = "";
  vContrasenia   : string = "";

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.storage.get('session_storage').then((res)=>{
      this.datos = res;
      this.identificacion = this.datos.identificacion;
    });
  }


  async cambiarPWD() {


    if ( this.contrasenia == "" ) {
        const toast = await this.toastCtrl.create({
          message: 'La contraseña es requerida',
          position: 'middle',
          duration: 3000
        });
        toast.present();
    } else if ( this.vContrasenia == "" ) {
      const toast = await this.toastCtrl.create({
        message: 'La validacion de contraseña es requerida',
        position: 'middle',
        duration: 3000
      });
      toast.present();
    } else if ( this.contrasenia != this.vContrasenia ) {
      const toast = await this.toastCtrl.create({
        message: 'Error, las contraseñas no coinciden',
        position: 'middle',
        duration: 3000
      });
      toast.present();
    } else  {

      let body = {
        identificacion : this.identificacion,
        contrasenia    : this.contrasenia,
        vContrasenia   : this.vContrasenia,
        funcion        : 'cambiarContrasenia'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        console.log(body);
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/principal']);
          this.contrasenia = '';
          this.vContrasenia = '';
          const toast = await this.toastCtrl.create({
            message: 'Cambio realizado exitosamente',
            position: 'middle',
            duration: 3000
          });
          toast.present();
        }else{
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
      });

    }
  }
}
