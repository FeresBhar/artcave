import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet, } from '@angular/router';
import { profile } from '../models/profile';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { socials } from '../models/socials';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,NgFor,NgIf,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  socials! : socials
  ProfileUsername? : string | null;
  profile!: profile;
  loggedin : boolean = false;
  currentUsername? : string;
  different? : boolean = false;
  Usertype: string | undefined;
  id! : number;

  constructor(private http:HttpClient,private userservice:UserService ,private authservice:AuthService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.ProfileUsername = this.route.snapshot.paramMap.get('username');
    this.currentUsername = this.authservice.username;
    this.id = this.authservice.id;
    if(this.ProfileUsername && this.currentUsername && (this.ProfileUsername !== this.currentUsername)){
      this.different = true;
    }
    
    if (this.ProfileUsername) {
      this.userservice.getProfile(this.ProfileUsername).subscribe((profile: profile) => {
        this.profile = profile;
      });
    }
    this.authservice.isLoggedIn().subscribe((login) => {
      this.loggedin = login;
    });
    this.Usertype = this.authservice.Usertype;
    this.userservice.socials(this.id).subscribe((res : socials)=>{
      this.socials = res;
    })
  }
}
