import { Component, OnInit } from '@angular/core';
import { profile } from '../models/profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-artist-portfolio',
  standalone: true,
  imports: [NgIf,NgFor,CommonModule,RouterLink],
  templateUrl: './artist-portfolio.component.html',
  styleUrl: './artist-portfolio.component.css'
})
export class ArtistPortfolioComponent implements OnInit {
  ProfileUsername? : string | null;
  profile!: profile;
  x : number = 0;
  loggedin : Observable<boolean> | undefined;
  currentUsername? : string;
  different? : boolean = false;

  constructor(private http:HttpClient,private userservice:UserService ,private authservice:AuthService, private route : ActivatedRoute){}

  ngOnInit(): void {
    console.log("hii");
    
    this.ProfileUsername = this.route.parent?.snapshot.paramMap.get('username');
    console.log(this.ProfileUsername);
    
    this.currentUsername = this.authservice.username;
    console.log(this.currentUsername);
    
    if(this.ProfileUsername !== this.currentUsername){
      this.different = true;
    }
    
    if (this.ProfileUsername) {
      this.userservice.getProfile(this.ProfileUsername).subscribe((profile: profile) => {
        console.log(profile);
        
        this.profile = profile;
        if (this.profile.images) {
          this.x = this.profile.images.length;
        }
      });
    };
    
    this.loggedin = this.authservice.isLoggedIn();
  }
}
