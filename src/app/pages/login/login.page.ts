import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../../providers/post-provider';
import { Storage } from '@ionic/Storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  identificacion: string;
  contrasenia: string;
  userInfo: any;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private router: Router,
    public menuCtrl: MenuController,
    private postPvdr: PostProvider,
    private storage: Storage
  ) { this.menuCtrl.enable(false, 'primerMenu'); }

  ngOnInit() {
  }

  async prosesLogin(){
    if(this.identificacion != "" && this.identificacion != ""){
      let body = {
        identificacion: this.identificacion,
        contrasenia: this.contrasenia,
        funcion: 'login'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.storage.set('session_storage', data.result);
          this.router.navigate(['/principal']);
          const toast = await this.toastCtrl.create({
		    message: 'Inicio sesión de éxitoso.',
		  	duration: 2000
		  });
		  toast.present();
		  this.identificacion = "";
		  this.contrasenia = "";
          console.log(data);
        }else{
          const toast = await this.toastCtrl.create({
		    message: alertpesan,
		    duration: 2000
		  });
    	  toast.present();
        }
      });

    }else{
      const toast = await this.toastCtrl.create({
		message: 'Identificacion o contraseña invalida.',
		duration: 2000
	  });
	  toast.present();
    }
  }

  formRecuperar() {
    this.router.navigate(['../../recuperar-pass']);
  }

}
