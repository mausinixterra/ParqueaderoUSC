import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { VideoPage } from 'src/app/pages/video/video.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Observable<Componente[]>;

  constructor(
    private dataService: DataService,
    private storage: Storage,
    private router: Router,
    public toastCtrl: ToastController,
    private videoPlayer: VideoPlayer,
    public modalCtrl: ModalController
    ) { }

    datos          : any;
    identificacion : string;
    nombre         : string;
    apellido       : string;

    ngOnInit() {
      this.componentes = this.dataService.getMenuOpts();
      this.storage.get('session_storage').then((res) => {
        this.datos          = res;
        this.identificacion = this.datos.identificacion;
        this.nombre         = this.datos.nombre;
        this.apellido       = this.datos.apellido;
      });
    }

  async prosesLogout() {
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastCtrl.create({
        message: 'Cierre de sesión exitoso',
        duration: 3000
      });
    toast.present();
  }

  async viewVideo() {
    const modal = await this.modalCtrl.create({
      component: VideoPage,
      // tslint:disable-next-line: max-line-length
      componentProps: { url: 'http://3.18.49.157/video.mp4?autoplay=1&cc_load_policy=1&fs=0&iv_load_policy=3&modestbranding=0&controls=0&showinfo=1&rel=0&start=1' },
      cssClass: 'viewVideoModal'
    });
    return modal.present();
  }
}
