import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { profile } from '../models/profile';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile!: profile;
  x : number = 0;

  ngOnInit(): void {
    
    this.profile = new profile("KOTB GHARBI","Lorem ipsum dolor sit amet, consectetur adipiscssa, scelerisque vitae, consequat in",
    ["3d","2d","bla bla"],"freelance artist",["https://dummyjson.com/image/150","https://dummyjson.com/image/150","https://dummyjson.com/image/150","https://dummyjson.com/image/150","https://dummyjson.com/image/150"],"https://dummyjson.com/image/150");

    if (this.profile.images) {
      this.x = this.profile.images.length;
    }
  }
}
