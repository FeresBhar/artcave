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
  Usertype: string | undefined;

  constructor(private http:HttpClient,private userservice:UserService ,private authservice:AuthService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.ProfileUsername = this.route.parent?.snapshot.paramMap.get('username');
    this.currentUsername = this.authservice.username;

    if(this.ProfileUsername !== this.currentUsername){
      this.different = true;
    }
    
    if (this.ProfileUsername) {
      this.userservice.getProfile(this.ProfileUsername).subscribe((profile: profile) => {
        this.profile = profile;
        if (this.profile.images) {
          this.x = this.profile.images.length;
        }
      });
    };
    
    this.loggedin = this.authservice.isLoggedIn();
    this.Usertype = this.authservice.Usertype;
  }
}
