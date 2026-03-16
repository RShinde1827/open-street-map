import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { OpenStreetMapFacade } from '../facade/open-street-map.facade';

export const authGuard: CanActivateFn = (route, state) => {
  const facade = inject(OpenStreetMapFacade);
  const router = inject(Router);

  return facade.isAuthenticated$.pipe(
    take(1),
    map((loggedIn) => {
      if (!loggedIn) {
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
      return true;
    })
  );
};