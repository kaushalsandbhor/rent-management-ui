import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentSettingsComponent } from './rent-settings.component';

describe('RentSettingsComponent', () => {
  let component: RentSettingsComponent;
  let fixture: ComponentFixture<RentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
