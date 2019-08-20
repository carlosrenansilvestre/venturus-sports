//Componentes
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { FooterComponent } from './main/footer/footer.component';
import { LoaderComponent } from './main/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './services/api-interceptor.service';

//Modules
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';

// Services
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    MainComponent
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent
  ],
  providers: [
    AuthService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})

export class CoreModule {

}
