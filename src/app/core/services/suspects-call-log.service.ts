import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SuspectCallLogResponse } from "../interface/suspects-call-log.interface";


@Injectable({
    providedIn: 'root',
})
export class SuspectsCallLogService {

    readonly #http = inject(HttpClient);

    getSuspectCallLog(): Observable<SuspectCallLogResponse> {
        return this.#http.get<SuspectCallLogResponse>('assets/mocks/suspects-call-log.json');
    }
}