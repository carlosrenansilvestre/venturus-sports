import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Services
import { HomeGuardService } from './guards/home-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../home/home.module#HomeModule', 
    data: { bc: 'Home'}
  }
];

RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
