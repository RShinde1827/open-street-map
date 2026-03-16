import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import {
  GetLoginActions,
  GetSucpectsAction,
  getSuspectCallLogs,
  GetSuspectCallLogsAction,
  getSuspectLocationDetails,
  GetSuspectLocationDetailsAction,
  init,
  logout,
} from './open-street-map.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SuspectsService } from '../services/suspects.service';
import { SuspectDatabase } from '../interface/suspect.interface';
import { SuspectLocationDetailsService } from '../services/suspect-location-details.service';
import { SuspectLocationHistory } from '../interface/suspect-location-history.interface';
import { SuspectsCallLogService } from '../services/suspects-call-log.service';
import { SuspectCallLogResponse } from '../interface/suspects-call-log.interface';

@Injectable({
  providedIn: 'root',
})
export class OpenStreetMapEffects {
  readonly #actions$ = inject(Actions);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly #suspectsService = inject(SuspectsService);
  readonly #store = inject(Store);
  readonly #suspectLocationDetailsService = inject(SuspectLocationDetailsService);
  readonly #suspectsCallLogService = inject(SuspectsCallLogService);

  readonly platformId = inject(PLATFORM_ID);

  ngrxOnInitEffects(): Action {
    return init();
  }

  checkIsLoggedIn$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(init),
      map(() => {
        let isLoggedIn = false;

        if (isPlatformBrowser(this.platformId)) {
          isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        }

        return GetLoginActions.loginSuccess({
          isAuthenticated: isLoggedIn,
        });
      }),
    ),
  );

  login$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(GetLoginActions.login),
      switchMap(({ email, password }) =>
        this.#authService.login(email, password).pipe(
          map((isAuthenticated: boolean) => {
            if (isAuthenticated) {
              return GetLoginActions.loginSuccess({ isAuthenticated });
            }
            return GetLoginActions.loginFailure({
              error: 'User not found or incorrect password',
            });
          }),
        ),
      ),
    ),
  );

  loginSuccessRedirect$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(GetLoginActions.loginSuccess),
        tap(({ isAuthenticated }) => {
          if (isAuthenticated) {
            this.#router.navigate(['/home']);
            this.#store.dispatch(GetSucpectsAction.getSuspects({}));
          }
        }),
      ),
    { dispatch: false },
  );

  getSuspects$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(GetSucpectsAction.getSuspects),
      switchMap(({}) =>
        this.#suspectsService.getSuspects().pipe(
          map((suspects: SuspectDatabase) =>
            GetSucpectsAction.getSuspectsSuccess({ suspects: suspects.suspects }),
          ),
          catchError((error) => of(GetSucpectsAction.getSuspectsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  logoutRedirect$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(logout),
        tap(() => this.#router.navigate(['/login'])),
      ),
    { dispatch: false },
  );

  getSuspectLocation$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getSuspectLocationDetails),
      switchMap(() =>
        this.#suspectLocationDetailsService.getSuspectLocationDetails().pipe(
          map((locationDetails: SuspectLocationHistory) =>
            GetSuspectLocationDetailsAction.getSuspectLocationDetailsSuccess({
              locationDetails: locationDetails.suspectLocation,
            }),
          ),
          catchError((error) =>
            of(
              GetSuspectLocationDetailsAction.getSuspectLocationDetailsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  getSuspectCallLogs$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(getSuspectCallLogs),
      switchMap(() =>
        this.#suspectsCallLogService.getSuspectCallLog().pipe(
          map((callLogsResponse: SuspectCallLogResponse) =>
            GetSuspectCallLogsAction.getSuspectCallLogsSuccess({
              callLogs: callLogsResponse.suspectsCallLog,
            }),
          ),
          catchError((error) =>
            of(GetSuspectCallLogsAction.getSuspectCallLogsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
