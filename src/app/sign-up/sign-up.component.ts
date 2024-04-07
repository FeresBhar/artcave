import { NgIf } from '@angular/common';
import { HttpClient ,HttpClientModule  } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule, FormControl , Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
    
    constructor(private http : HttpClient,private router:Router) {}

    Signup : FormGroup = new FormGroup({})

    ngOnInit(): void {
        this.Signup= new FormGroup({
          Username : new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
          Email : new FormControl(null , [Validators.required ,Validators.email] ),
          Password : new FormControl(null,[Validators.required,Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]),
          type : new FormControl(null,Validators.required)
        })
    }

    OnSignupSubmit() {

      if(this.Signup.valid){
        this.http.post("http://localhost/api/signup.php",this.Signup.value).subscribe((res : any) => {
          if (res.result == "User added successfully") {
            Swal.fire({
              title: "Good job!",
              text: res.result,
              icon: "success"
            });
            this.router.navigate(['/login']);
          } else {
            Swal.fire({
              title: "Oops...",
              text: res.result, 
              icon: "error"
            });
          }
        },
          (error) => {
          console.error("Error:", error);
          });
        }
        
      }
      
  
}
