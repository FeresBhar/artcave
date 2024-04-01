import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username?: String;
  
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>("http://localhost/api/login.php",user).pipe(
      tap(response => {
        if (response.result && response.jwt) {
          localStorage.setItem('token', response.jwt);
          this.loggedIn.next(true);
          this.username = user.username;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
