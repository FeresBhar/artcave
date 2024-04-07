import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { profile } from '../models/profile';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  profile! : profile;
  currentUsername? : string;

  constructor(private userservice : UserService,private authservice : AuthService, private route : Router){}

  ngOnInit(): void {
    this.currentUsername = this.authservice.username;
    if(this.currentUsername){
      this.userservice.getProfile(this.currentUsername).subscribe((profile: profile) => {
        this.profile = profile;})
    }
  }

  logout() { 
    this.authservice.logout();
    this.route.navigate(['/explore']);
  }

}
