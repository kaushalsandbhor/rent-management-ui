import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPaymentDialogComponent } from './collect-payment-dialog.component';

describe('CollectPaymentDialogComponent', () => {
  let component: CollectPaymentDialogComponent;
  let fixture: ComponentFixture<CollectPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectPaymentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
