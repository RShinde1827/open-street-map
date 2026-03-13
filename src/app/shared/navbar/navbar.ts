import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { OpenStreetMapFacade } from '../../core/facade/open-street-map.facade';
import { Store } from '@ngrx/store';
import { logout } from '../../core/+state/open-street-map.action';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar{

  readonly store = inject(Store)
  readonly router = inject(Router);
  readonly authService = inject(AuthService);
  readonly openStreetMapFacade = inject(OpenStreetMapFacade);

  isLoggedIn$ = this.openStreetMapFacade.isAuthenticated$;

  logout() {
    this.authService.logout();
    this.store.dispatch(logout({ isAuthenticated: false }));
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
