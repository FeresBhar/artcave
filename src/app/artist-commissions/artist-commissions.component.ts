import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artist-commissions',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './artist-commissions.component.html',
  styleUrl: './artist-commissions.component.css'
})
export class ArtistCommissionsComponent {

}
