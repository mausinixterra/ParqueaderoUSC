import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { PostProvider } from '../../../providers/post-provider';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  identificacion: string;

  constructor(
    public toastCtrl: ToastController,
    private router: Router,
    public menuCtrl: MenuController,
    private postPvdr: PostProvider,
  ) { this.menuCtrl.enable(false, 'primerMenu'); }

  ngOnInit() {
  }

  async prosesRecuperar(){
    // validation done
    if ( this.identificacion == "" ) {
        const toast = await this.toastCtrl.create({
          message: 'El usuario es requerido',
          duration: 3000
        });
        toast.present();
    } else {

      let body = {
        identificacion: this.identificacion,
        funcion: 'recuperar'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/']);
          const toast = await this.toastCtrl.create({
            message: 'Contraseña enviada a su correo electronico',
            duration: 3000
          });
          toast.present();
        } else {
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
      });

    }

  }

  cancelarRecuperar() {
    this.router.navigate(['../../login']);
    this.identificacion = '';
  }

}
