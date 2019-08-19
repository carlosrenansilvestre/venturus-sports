
//Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    NewUserComponent
  ],
  exports: [
    HomeComponent,
    NewUserComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
