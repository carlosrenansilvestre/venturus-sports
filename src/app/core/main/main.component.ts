import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  ActivationStart,
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  NavigationStart
} from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { filter, pluck, buffer, map } from 'rxjs/operators';

const isNavigationEnd = (ev: Event) => ev instanceof NavigationEnd;
const isActivationEnd = (ev: Event) => ev instanceof ActivationEnd;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  bcLoadedData;
  bcForDisplay;

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
    const navigationEnd$ = this.router.events.pipe(filter(isNavigationEnd));

    this.router.events
      .pipe(
        filter(isActivationEnd),
        pluck("snapshot"),
        pluck("data"),
        buffer(navigationEnd$),
        map((bcData: any[]) => bcData.reverse())
      )
      .subscribe(x => {
        this.bcLoadedData = x;
        console.log("OW", this.bcLoadedData);
      });
  }


}
