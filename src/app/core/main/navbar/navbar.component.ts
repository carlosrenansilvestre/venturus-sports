import { Component, OnInit } from '@angular/core';

//Services
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {  
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  public menuState: boolean = false;

  ngOnInit() {
  }
}
