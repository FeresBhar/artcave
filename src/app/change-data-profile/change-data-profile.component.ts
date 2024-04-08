import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { profile } from '../models/profile';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-data-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-data-profile.component.html',
  styleUrl: './change-data-profile.component.css'
})
export class ChangeDataProfileComponent implements OnInit{

  profile! : profile;
  currentUsername? : string;

  selectedImage: string = 'Click to upload image';
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file.name;
    } else {
      this.selectedImage = 'Click to upload image';
    }
  }

  ChangeData : FormGroup = new FormGroup({})

  constructor(private router: Router,private http : HttpClient,private authservice : AuthService,private userservice:UserService){}

  ngOnInit(): void {
    this.currentUsername = this.authservice.username;
    if(this.currentUsername){
      this.userservice.getProfile(this.currentUsername).subscribe((profile: profile) => {
        this.profile = profile;})
    }
  }

  OnChangeData() {
    this.userservice.updateProfile(this.ChangeData.value).subscribe((res : any)=>{
      console.log(res);
      this.router.navigate(['/explore']);
    })

  }

  

}
