import { inject, Injectable } from "@angular/core";
import { SuspectDatabase } from "../interface/suspect.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class SuspectsService {

    readonly http = inject(HttpClient);

    getSuspects(): Observable<SuspectDatabase> {
        return this.http.get<SuspectDatabase>('assets/mocks/suspects.json');
    }
}