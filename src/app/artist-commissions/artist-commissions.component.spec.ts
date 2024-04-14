import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCommissionsComponent } from './artist-commissions.component';

describe('ArtistCommissionsComponent', () => {
  let component: ArtistCommissionsComponent;
  let fixture: ComponentFixture<ArtistCommissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistCommissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
