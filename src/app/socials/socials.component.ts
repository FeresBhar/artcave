
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { NgIf } from '@angular/common';
import { socials } from '../models/socials';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent implements OnInit {
  socials!:socials;
  id! : number;
  currentUsername?:string;

  settings : FormGroup = new FormGroup({})

  constructor(private authservice : AuthService, private userservice : UserService){}

  ngOnInit(): void {
    this.id = this.authservice.id;
    this.currentUsername = this.authservice.username;
    if(this.id){
      this.userservice.socials(this.id).subscribe((res: socials) => {
        this.socials = res;
        console.log(res);
        this.Form();
      });
    }
  }
  
  Form() {
    this.settings= new FormGroup({
      Github : new FormControl(this.socials.Github,Validators.required),
      Linkedin : new FormControl(this.socials.Linkedin,Validators.required),
      Facebook : new FormControl(this.socials.Facebook,Validators.required),
      Instagram : new FormControl(this.socials.Instagram,Validators.required)
    });
  }

  OnSettings() {
    console.log("gg");

}
}
