import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : any
  username: string | undefined;
  id! : number ;

  Usertype: string | undefined;
  
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
      if (this.token) {
        this.loggedIn.next(true);
        const decoded = jwtDecode(this.token);
        this.username  = (decoded as { data: { username: string } }).data.username;
        this.id = (decoded as { data: { id: number } }).data.id;
        this.Usertype = ((decoded as { data: { type: string } }).data.type);
      }
    }
  }

  login(user: { Username: string, Password: string }): Observable<any> {
    return this.http.post<any>("http://localhost/api/login.php",user).pipe(
      tap(response => {
        if (response.result && response.jwt) {
          localStorage.setItem('token', response.jwt);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    window.location.reload();
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

}
