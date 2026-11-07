import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSmallComponent } from './product-list-small.component';

describe('ProductListSmallComponent', () => {
  let component: ProductListSmallComponent;
  let fixture: ComponentFixture<ProductListSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
