import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/Storage';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule} from '@angular/common/http';
import { PostProvider } from '../providers/post-provider';
import { HttpModule } from '@angular/http';
import { PipesModule } from './pipes/pipes.module';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { VideoPage } from './pages/video/video.page';



@NgModule({
  declarations: [AppComponent, VideoPage],
  entryComponents: [VideoPage],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    PostProvider,
    SplashScreen,
    VideoPlayer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
