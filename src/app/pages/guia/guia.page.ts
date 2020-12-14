import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-guia',
  templateUrl: './guia.page.html',
  styleUrls: ['./guia.page.scss'],
})
export class GuiaPage implements OnInit {

  constructor(
    public menuCtrl: MenuController
  ) { this.menuCtrl.enable(false, 'primerMenu'); }

  ngOnInit() {

  }



}
