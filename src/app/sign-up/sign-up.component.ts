import { NgIf } from '@angular/common';
import { HttpClient  } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule, FormControl , Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

    constructor(private http : HttpClient) {}

    Signup : FormGroup = new FormGroup({})

    ngOnInit(): void {
        this.Signup= new FormGroup({
          Username : new FormControl(null,Validators.required),
          Email : new FormControl(null , [Validators.required ,Validators.email] ),
          Password : new FormControl(null),
          type : new FormControl(null)
        })
    }

    

    OnSignupSubmit() {

      console.log(this.Signup);

      this.http.post("http://localhost/api/signup.php",this.Signup.value).subscribe((res) => {
          console.log(res);
          Swal.fire({
            title: "Good job!",
            text: "User created successfully!",
            icon: "success"
          });},
          (error) => {
          console.error("Error:", error);
          });}
  
}
