import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { profile } from '../models/profile';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  ProfileUsername? : string | null;
  profile!: profile;
  x : number = 0;

  constructor(private http:HttpClient,private userservice:UserService , private route : ActivatedRoute){}

  ngOnInit(): void {
    this.ProfileUsername = this.route.snapshot.paramMap.get('username');
    if (this.ProfileUsername) {
      this.userservice.getProfile(this.ProfileUsername).subscribe((profile: profile) => {
        this.profile = profile;
        if (this.profile.images) {
          this.x = this.profile.images.length;
        }
      });
    }
  }
}
