import { Component, inject } from '@angular/core';
import { OpenStreetMapFacade } from '../../core/facade/open-street-map.facade';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSuspectCallLogs, getSuspectLocationDetails } from '../../core/+state/open-street-map.action';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
    readonly openStreetMapFacade = inject(OpenStreetMapFacade);
    readonly #router = inject(Router);
    readonly #store = inject(Store);

    isLoggedIn$ = this.openStreetMapFacade.isAuthenticated$;
    
    navigateToSuspectList() {
      this.#router.navigate(['/suspect-list']);
    }

    navigateToLocationTracker() {
      this.#router.navigate(['/location-tracker']);
      this.#store.dispatch(getSuspectLocationDetails());
      this.#store.dispatch(getSuspectCallLogs());
    }
}
