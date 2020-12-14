import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSegment, ToastController } from '@ionic/angular';
import { Componente } from '../../interfaces/interfaces';
import { PostProvider } from '../../../providers/post-provider';
import { Storage } from '@ionic/Storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  componentes: Componente[] = [];


  anggota: any;
  username: string;
  estado = '';
  
  customers: any = [];
  limit: number = 13; // LIMIT GET PERDATA
  start: number = 0;
  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    private menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public menu: MenuController
  ) { this.activarMenu()  }

  activarMenu() {
    this.menu.enable(true, 'primerMenu');
  }

  ngOnInit() {
    this.segment.value = 'todos';
  }

  segmentChanged( event ) {
    const valorSegmento = event.detail.value;
    if ( valorSegmento === 'todos' ) {
      this.estado = '';
      return;
    }

    this.estado = valorSegmento;

    console.log(valorSegmento);
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.username = this.anggota.username;
      console.log(this.anggota);
    });

  	this.customers = [];
  	this.start = 0;
  	this.loadCustomer();
  }

  addCustomer(){
  	this.router.navigate(['/addcustomer']);
  }

  updateCustomer(id,name,desc){
  	this.router.navigate(['/addcustomer/' + id + '/' + name + '/' + desc]);
  }

  showCustomer(id,name,desc){
  	this.router.navigate(['/showcustomer/' + id + '/' + name + '/' + desc]);
  }

  doRefresh(event){
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

  loadData(event:any){
  	this.start += this.limit;
  	setTimeout(() => {
  	this.loadCustomer().then(() => {
  		event.target.complete();
  	});
  	}, 500);
  }

  delCustomer(id){

let body = {
  aksi : 'delete',
  customer_id : id
};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			this.ionViewWillEnter();
  		});

  }

  loadCustomer(){
  	return new Promise(resolve => {
  		let body = {
  			aksi : 'getdata',
  			limit : this.limit,
  			start : this.start,
  		};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
  			for(let customer of data.result){
  				this.customers.push(customer);
  			}
  			resolve(true);
  		});
  	});
  }

  async prosesLogout(){
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastCtrl.create({
        message: 'Cierre de sesión exitoso',
        duration: 3000
      });
    toast.present();
  }

}
