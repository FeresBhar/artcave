import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { profile } from '../models/profile';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,CommonModule,FormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  profiles : profile[] | undefined;

  constructor(private userservice : UserService,private http : HttpClient){}

  ngOnInit(): void {
      this.userservice.getArtists().subscribe((profile : profile[]) =>{
        this.profiles = profile;
      })
  }
  chunkArray(array: any[], size: number): any[][] {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
        chunkedArr.push(array.slice(index, size + index));
        index += size;
    }
    return chunkedArr;
}

@ViewChild('tabsBox') tabsBox: ElementRef | undefined;
  @ViewChild('arrowLeft') arrowLeft: ElementRef | undefined;
  @ViewChild('arrowRight') arrowRight: ElementRef | undefined;

  isDragging: boolean = false;
  tabs: string[] = [
    "3D",
    "Design",
    "Illustration",
    "Painting",
    "Drawing",
    "Sketching",
    "Portraits",
    "Digital",
    "Traditional",
    "Animation",
    "Comics",
    "Caricatures",
    "Logo",
    "Photography",
    "Fashion",
    "Jewelry",
    "Game",
    "Environmental",
    "Product Visualization",
    "Seascape",
    "Fantasy",
    "Architectural Visualization",
    "Landscape",
    "Sci-Fi",
    "Traditional Crafts",
    "Digital Crafts",
    "Manga/Anime",
    "Pointillism",
    "Abstract",
  ];
  activeTabIndex: number = 0;


  ngAfterViewInit() {
    this.handleIcons();
  }

  handleIcons() {
    if (this.tabsBox && this.arrowLeft && this.arrowRight) {
      let maxScrollableWidth = this.tabsBox.nativeElement.scrollWidth - this.tabsBox.nativeElement.clientWidth;
      this.arrowLeft.nativeElement.style.display = this.tabsBox.nativeElement.scrollLeft <= 0 ? "none" : "flex";
      this.arrowRight.nativeElement.style.display = maxScrollableWidth - this.tabsBox.nativeElement.scrollLeft <= 1 ? "none" : "flex";
    }
  }
  

  iconClicked(direction: string) {
    if (this.tabsBox) {
      let scrollWidth = this.tabsBox.nativeElement.scrollLeft += direction === "left" ? -340 : 340;
      this.handleIcons();
    }
  }

  tabClicked(index: number) {
    if (this.tabsBox) {
      this.activeTabIndex = index;
      this.tabsBox.nativeElement.querySelector(".active").classList.remove("active");
      this.tabsBox.nativeElement.querySelectorAll(".tab")[index].classList.add("active");
    }
  }

  dragging(event: MouseEvent) {
    if (this.tabsBox && this.isDragging) {
      this.tabsBox.nativeElement.classList.add("dragging");
      this.tabsBox.nativeElement.scrollLeft -= event.movementX;
      this.handleIcons();
    }
  }

  dragStop() {
    this.isDragging = false;
    if (this.tabsBox) {
      this.tabsBox.nativeElement.classList.remove("dragging");
    }
  }

  onMouseDown() {
    this.isDragging = true;
  }
}
