import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { profile } from '../models/profile';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  profiles : profile[] | undefined;

  constructor(private userservice : UserService){}

  ngOnInit(): void {
      this.userservice.getArtists().subscribe((profile : profile[]) =>{
        this.profiles = profile;
      })


  }

}
