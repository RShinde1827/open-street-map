import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SuspectLocationHistory } from "../interface/suspect-location-history.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class SuspectLocationDetailsService {

    readonly #http = inject(HttpClient);

    getSuspectLocationDetails(): Observable<SuspectLocationHistory> {
        return this.#http.get<SuspectLocationHistory>('assets/mocks/suspects-location.json');
    }
}