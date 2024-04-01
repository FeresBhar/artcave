import { NgIf } from '@angular/common';
import { HttpClient ,HttpClientModule  } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule, FormControl , Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  login : FormGroup = new FormGroup({});

  constructor(private http:HttpClient,private router:Router,private authService: AuthService){}

  ngOnInit(): void {
      this.login= new FormGroup({
        Username : new FormControl(null,Validators.required),
        Password : new FormControl(null,Validators.required),
      })
  }


  OnLoginSubmit() {
    if(this.login.valid){
      this.authService.login(this.login.value).subscribe((res : any) =>{
        if(res.result === true){
          this.router.navigate(['/explore']);
        }
        else if(res.result =="Username is incorrect"){
          this.login.get("Username")?.setErrors({ incorrect: true });
        }
        else if(res.result =="Password incorrect"){
          this.login.get("Password")?.setErrors({ incorrect: true });
        }
      },
      (error) =>{
        console.log(error);
        
    })

    }
    
  }



}
