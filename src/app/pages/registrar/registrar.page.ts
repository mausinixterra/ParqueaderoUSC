import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  tipoIdentificacion  : string = '';
  identificacion      : string = '';
  nombre              : string = '';
  apellido            : string = '';
  correoInstitucional : string = '';
  telefono            : string = '';
  contrasenia         : string = '';
  confirm_contrasenia : string = '';


  constructor(
    public toastCtrl: ToastController,
    private router: Router,
    public menuCtrl: MenuController,
    private postPvdr: PostProvider
  ) { this.menuCtrl.enable(false, 'primerMenu'); }

  ngOnInit() {
  }

  async prosesRegister() {
    // validation done
    if ( this.tipoIdentificacion == '' ) {
        const toast = await this.toastCtrl.create({
          message: 'El tipo de identificación es requerido',
          duration: 3000
        });
        toast.present();
    } else if ( this.identificacion == '' ) {
      const toast = await this.toastCtrl.create({
        message: 'La identificación es requerida',
        duration: 3000
      });
      toast.present();
    } else if ( this.nombre == '' ) {
      const toast = await this.toastCtrl.create({
        message: 'El nombre es requerido',
        duration: 3000
      });
      toast.present();
    } else if ( this.apellido == '' ) {
      const toast = await this.toastCtrl.create({
        message: 'El apellido es requerido',
        duration: 3000
      });
      toast.present();
    } else if ( this.correoInstitucional == '' ) {
      const toast = await this.toastCtrl.create({
        message: 'El correo institucional es requerido',
        duration: 3000
      });
      toast.present();
    } else if ( this.telefono == '' ) {
      const toast = await this.toastCtrl.create({
        message: 'El telefono es requerido',
        duration: 3000
      });
      toast.present();
    } else if (this.contrasenia == ''){
        const toast = await this.toastCtrl.create({
          message: 'La contraseña es requerida',
          duration: 3000
        });
        toast.present();
    } else if (this.contrasenia != this.confirm_contrasenia){
        const toast = await this.toastCtrl.create({
          message: 'Contraseña invalida',
          duration: 3000
        });
        toast.present();
    } else {

      let body = {
        tipoIdentificacion  : this.tipoIdentificacion,
        identificacion      : this.identificacion,
        nombre              : this.nombre,
        apellido            : this.apellido,
        correoInstitucional : this.correoInstitucional,
        telefono            : this.telefono,
        contrasenia         : this.contrasenia,
        funcion: 'registar'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        console.log(body);
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/login']);
          const toast = await this.toastCtrl.create({
            message: 'Registro exitosamente',
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
  cancelarRegistro() {
    this.router.navigate(['../../login']);
  }

}
