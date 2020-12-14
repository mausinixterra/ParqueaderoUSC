import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  { path: '', redirectTo: 'guia', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule), canActivate: [UsuarioGuard]
  },
  {
    path: 'recuperar-pass',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./pages/recuperar-pass/recuperar-pass.module').then( m => m.RecuperarPassPageModule), canActivate: [UsuarioGuard]
  },
  {
    path: 'acerca-de',
    loadChildren: () => import('./pages/acerca-de/acerca-de.module').then( m => m.AcercaDePageModule), canActivate: [UsuarioGuard]
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'guia',
    loadChildren: () => import('./pages/guia/guia.module').then( m => m.GuiaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule), canActivate: [UsuarioGuard]
  },
  {
    path: 'cambiar-pass',
    loadChildren: () => import('./pages/cambiar-pass/cambiar-pass.module').then( m => m.CambiarPassPageModule), canActivate: [UsuarioGuard]
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule), canActivate: [UsuarioGuard]
  },
  {
    path: 'noticia',
    loadChildren: () => import('./pages/noticia/noticia.module').then( m => m.NoticiaPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then( m => m.VideoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
