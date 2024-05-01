import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { profile } from '../models/profile';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
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
      email : new FormControl(this.profile.email,Validators.email),
      Password : new FormControl(null,Validators.minLength(6)),
      confirm : new FormControl(null,Validators.minLength(6))
    });
  }

  OnSettings() {
    if(this.settings.value.Password !== this.settings.value.confirm){
      this.settings.get("confirm")?.setErrors({ incorrect: true });
    }else if(this.settings.valid){
      
    }
  }

}
