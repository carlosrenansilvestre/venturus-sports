import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HomeGuardService {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean | Promise<boolean> {
    return true;
  }
}
