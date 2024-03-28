import { NgIf } from '@angular/common';
import { HttpClient ,HttpClientModule  } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule,FormGroup, ReactiveFormsModule, FormControl , Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink,FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
    contact : FormGroup = new FormGroup({})

    OnContactSubmit() {
      console.log("contact submitted");
      
    }

}
