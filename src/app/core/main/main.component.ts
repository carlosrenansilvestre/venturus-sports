import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isLogin: boolean = true;
  public isUserLogged: boolean = false;
  public exibeBusca: boolean = null;

  public resetUserAuthSubcription = new Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((e: any) => {

      if (e instanceof NavigationStart) {
      }

      if (e instanceof NavigationEnd) {
      }

      window.scrollTo(0, 0);
    });
   }

  ngOnInit() {
  }
}
