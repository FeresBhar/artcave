import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  username : String | undefined;
  loggedin : Observable<boolean> | undefined;

  constructor(private authservice : AuthService){}
  ngOnInit(): void {
    this.loggedin = this.authservice.isLoggedIn();
    if(this.loggedin){
      this.username = this.authservice.username;
    }
  }

}
