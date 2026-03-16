import { inject, Injectable } from '@angular/core';
import { User, UserData } from '../interface/userdata.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly #http = inject(HttpClient);

  login(email: string, password: string): Observable<boolean> {
     return this.#http.get<User>('assets/mocks/user-data.json').pipe(map((data: User) => {
      return this.isAuthenticated(data, email, password);
    }));
  }

  isAuthenticated(userData: User, email: string, password: string): boolean {
    const user = userData.users.find(
          (u: UserData) => u.email === email && u.password === password
        );

        console.log('Authenticated User:', user);

        if (user) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }

        return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  }
}
