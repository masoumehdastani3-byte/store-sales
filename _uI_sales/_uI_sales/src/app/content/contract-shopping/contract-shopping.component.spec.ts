import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractShoppingComponent } from './contract-shopping.component';

describe('ContractShoppingComponent', () => {
  let component: ContractShoppingComponent;
  let fixture: ComponentFixture<ContractShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
