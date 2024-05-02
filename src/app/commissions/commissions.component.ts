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

  updateRequestStatus(reqid: number, status: string) {
    const request = {
      reqid: reqid,
      msg: status,
    };
  
    this.http.post<any>("http://localhost/api/status.php", request).subscribe((res: any) => {
        if (res.result === true) {
          const index = this.Requests.findIndex(req => req.reqid === reqid);
          if (index !== -1) {
            this.Requests[index].status = status;
          }
        } else {
          console.error("Failed to update status");
        }
      }, error => {
        console.error("Failed to update status:", error);
      });
  }
  accept(reqid : number) {
    this.updateRequestStatus(reqid, 'Accepted');
  }
  deny(reqid : number) {
    this.updateRequestStatus(reqid, 'Denied');
  }
  cancel(reqid : number) {
    this.updateRequestStatus(reqid, 'Cancelled');
  }

}
