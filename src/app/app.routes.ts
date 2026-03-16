import { Routes } from '@angular/router';
import { Login } from './shared/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./feature/home/home').then((m) => m.Home),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'suspect-list',
    loadComponent: () => import('./feature/suspect-list/suspect-list').then((m) => m.SuspectList),
    canActivate: [authGuard],
  },
  {
    path: 'location-tracker',
    loadComponent: () =>
      import('./feature/location-tracker/location-tracker').then((m) => m.LocationTracker),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
