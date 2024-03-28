import { NgIf } from '@angular/common';
import { HttpClient ,HttpClientModule  } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule, FormControl , Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  login : FormGroup = new FormGroup({});

  constructor(private http:HttpClient,private router:Router){}

  ngOnInit(): void {
      this.login= new FormGroup({
        username : new FormControl(null,Validators.required),
        password : new FormControl(null,Validators.required),
      })
  }


  OnLoginSubmit() {
    if(this.login.valid){
      this.http.post("http://localhost/api/login.php",this.login.value).subscribe((res : any) =>{
        console.log(res);
        if(res.result =="true"){
          this.router.navigate(['/explore']);
        }
        else if(res.result =="Username incorrect"){
          this.login.get("username")?.setErrors({ incorrect: true });
        }
        else if(res.result =="Password incorrect"){
          this.login.get("password")?.setErrors({ incorrect: true });
        }
      },
      (error) =>{
        console.log(error);
        
    })

    }
    
  }



}
