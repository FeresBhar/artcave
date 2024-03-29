import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDataProfileComponent } from './change-data-profile.component';

describe('ChangeDataProfileComponent', () => {
  let component: ChangeDataProfileComponent;
  let fixture: ComponentFixture<ChangeDataProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeDataProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeDataProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
