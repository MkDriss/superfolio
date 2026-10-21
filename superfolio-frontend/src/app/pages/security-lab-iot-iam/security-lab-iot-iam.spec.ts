import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityLabIotIam } from './security-lab-iot-iam';

describe('SecurityLabIotIam', () => {
  let component: SecurityLabIotIam;
  let fixture: ComponentFixture<SecurityLabIotIam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityLabIotIam],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityLabIotIam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
