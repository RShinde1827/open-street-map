import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideHttpClient } from '@angular/common/http';

import { reducer } from './core/+state/open-street-map.reducer';
import { GoogleMapsModule } from '@angular/google-maps';
import { metaReducers } from './core/+state/meta-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(StoreModule.forRoot(
      { openStreetMap: reducer },
      { metaReducers }
    )),
    importProvidersFrom(EffectsModule.forRoot([])),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    provideHttpClient(),
    importProvidersFrom(GoogleMapsModule),

  ],
};
