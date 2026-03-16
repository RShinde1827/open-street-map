import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetLoginActions } from '../../core/+state/open-street-map.action';
import { OpenStreetMapFacade } from '../../core/facade/open-street-map.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  readonly store = inject(Store);
  readonly openStreetMapFacade = inject(OpenStreetMapFacade);

  errorMessage = '';

  isLoggedIn$ = this.openStreetMapFacade.isAuthenticated$;
  isLoggedOut$ = this.openStreetMapFacade.isLoggedOut$;
  loginError$ = this.openStreetMapFacade.error$;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(GetLoginActions.login({ email: email!, password: password! }));
    }
  }
}
