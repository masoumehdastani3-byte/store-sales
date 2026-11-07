import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListLargeComponent } from './product-list-large.component';

describe('ProductListLargeComponent', () => {
  let component: ProductListLargeComponent;
  let fixture: ComponentFixture<ProductListLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
