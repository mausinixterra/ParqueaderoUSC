import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  public videoUrl;

  constructor(
    public modalCtrl: ModalController,
    public navParms: NavParams,
    public sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute
  ) {
    console.log(' this.navParms', this.navParms.data.url);
    this.videoUrl = this.navParms.data.url;
    console.log( this.videoUrl );
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
