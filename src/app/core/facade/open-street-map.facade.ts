import { inject, Injectable } from "@angular/core";
import { selectIsAuthenticated, selectLoggedOutUser, selectSuspectCallLogs, selectSuspectList, selectSuspectLocationDetails } from "../+state/open-street-map.selector";
import { Store } from "@ngrx/store";
import { Suspect } from "../interface/suspect.interface";
import { Observable } from "rxjs";
import { SuspectLocation } from "../interface/suspect-location-history.interface";

@Injectable({
    providedIn: 'root',
})

export class OpenStreetMapFacade {
    readonly store = inject(Store);
    isAuthenticated$ = this.store.select(selectIsAuthenticated);
    isLoggedOut$ = this.store.select(selectLoggedOutUser);
    suspectList$: Observable<Suspect[]> = this.store.select(selectSuspectList);
    suspectLocationDetails$: Observable<SuspectLocation[]> = this.store.select(selectSuspectLocationDetails);

    suspectCallLogs$ = this.store.select(selectSuspectCallLogs);
}