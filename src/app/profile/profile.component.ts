import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { profile } from '../models/profile';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  ProfileUsername? : string | null;
  profile!: profile;
  x : number = 0;
  loggedin : Observable<boolean> | undefined;
  currentUsername? : string;
  different? : boolean = false;

  constructor(private http:HttpClient,private userservice:UserService ,private authservice:AuthService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.ProfileUsername = this.route.snapshot.paramMap.get('username');
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
    }
    this.loggedin = this.authservice.isLoggedIn();
  }
}
