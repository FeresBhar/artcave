import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { profile } from '../models/profile';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  
  profile! : profile;
  currentUsername? : string;

  settings : FormGroup = new FormGroup({})

  constructor(private router: Router,private http : HttpClient,private authservice : AuthService,private userservice:UserService){}

  ngOnInit(): void {
    this.currentUsername = this.authservice.username;
    if(this.currentUsername){
      this.userservice.getProfile(this.currentUsername).subscribe((profile: profile) => {
        this.profile = profile;
        this.Form();
      });
    }
  }
  
  Form() {
    this.settings= new FormGroup({
      Username : new FormControl(this.profile.Username),
      Password : new FormControl(null),
      confirm : new FormControl(null)
    });
    console.log(this.settings.value);
  }

  OnSettings() {
    
    }

}
