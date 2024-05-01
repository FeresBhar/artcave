import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,RouterLink } from '@angular/router';
import { ArtistCommission } from '../models/ArtistCommission';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormGroup, ReactiveFormsModule, FormControl , Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artist-commissions',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './artist-commissions.component.html',
  styleUrl: './artist-commissions.component.css'
})
export class ArtistCommissionsComponent implements OnInit {

  commissions? : ArtistCommission[];
  ProfileUsername? : string | null;
  loggedin : Observable<boolean> | undefined;
  currentUsername? : string;
  different? : boolean = false;
  CommissionTitle?: string;
  CommissionInstructions?: string;
  CommissionPrice!: number;
  comID? : number;

  pay : FormGroup = new FormGroup({});
  Usertype: string | undefined;


  constructor(private http:HttpClient,private authservice:AuthService, private route : ActivatedRoute,private router : Router){}

  ngOnInit(): void {

    this.ProfileUsername = this.route.parent?.snapshot.paramMap.get('username');
    this.currentUsername = this.authservice.username;

    if(this.ProfileUsername !== this.currentUsername){
      this.different = true;
    }
    
    this.loggedin = this.authservice.isLoggedIn();
    this.Usertype = this.authservice.Usertype;
    
    if(this.ProfileUsername){
      this.http.get<ArtistCommission[]>(`http://localhost/api/commission.php?username=${this.ProfileUsername}`).subscribe((res : any) =>{
        this.commissions = res;
      })
    }
    this.pay= new FormGroup({
      description : new FormControl(null,Validators.required),
      price : new FormControl(null,Validators.required),
      comID : new FormControl(null)
    })
  }
  SelectedCommission(title: string, price: number,intru:string,comID:number) {
    if(!this.loggedin){
      this.router.navigate(['/login']);
      return;
    }
    this.CommissionTitle = title;
    this.CommissionPrice = price;
    this.CommissionInstructions = intru;
    this.comID = comID;
    this.pay.patchValue({comID : comID})
  }

  payupbruh(){
    if(this.pay.value.price < this.CommissionPrice) {
      this.pay.get("price")?.setErrors({ incorrect: true });
    }
    if(this.pay.valid){
      this.http.post("http://localhost/api/commreq.php",this.pay.value).subscribe((res : any) => {
        if(res.success){
          Swal.fire({
            title: "Good job!",
            text: res.message,
            icon: "success"
          });
        }
      })
      
    }
  }
  
}
