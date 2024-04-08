import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCommissionComponent } from './send-commission.component';

describe('SendCommissionComponent', () => {
  let component: SendCommissionComponent;
  let fixture: ComponentFixture<SendCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendCommissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
