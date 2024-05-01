import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getProfile(username: string): Observable<any> {
    return this.http.get<any>(`http://localhost/api/artist.php?username=${username}`);
  }

  getYourProfile(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost/api/artist.php?id=${id}`);
  }


  getArtists() : Observable<any>{
    return this.http.get<any>("http://localhost/api/feed.php");
  }

  updateProfile(user : any): Observable<any> {
    return this.http.put<any>("http://localhost/api/profile.php",user);
  }

}
