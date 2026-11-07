import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBankPWGComponent } from './confirm-bank-pwg.component';

describe('ConfirmBankPWGComponent', () => {
  let component: ConfirmBankPWGComponent;
  let fixture: ComponentFixture<ConfirmBankPWGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBankPWGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBankPWGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
