import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ComRequest } from '../models/ComRequest';


@Component({
  selector: 'app-commissions',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './commissions.component.html',
  styleUrl: './commissions.component.css'
})
export class CommissionsComponent implements OnInit{

  Usertype: string | undefined;
  username: string | undefined;
  id : number | undefined;
  Requests! : ComRequest[]; 

  constructor(private authservice: AuthService , private http : HttpClient) { }

  ngOnInit(): void {
    this.Usertype = this.authservice.Usertype;
    this.username = this.authservice.username;
    this.id = this.authservice.id;
    this.http.get(`http://localhost/api/comfeed.php?username=${this.username}&type=${this.Usertype}&id=${this.id}`).subscribe((res : any) =>{
      this.Requests = res;      
    })
  }


}
