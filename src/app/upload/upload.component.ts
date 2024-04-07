import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit{

  constructor(private http : HttpClient,private router:Router,private authservice : AuthService) {}

  upload : FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.upload= new FormGroup({
      title : new FormControl(null,Validators.required),
      description : new FormControl(null , Validators.required ),
      imageURL: new FormControl(null,Validators.required)
    })

}

Upload() {

  if(this.upload.valid){
    this.http.post("http://localhost/api/artwork.php",this.upload.value).subscribe((res : any) => {
      if(res.result){
        this.router.navigate(["/profile",this.authservice.username])
      }else {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong , Please try again", 
          icon: "error"
        });
      }
      
    
  })}}
}
