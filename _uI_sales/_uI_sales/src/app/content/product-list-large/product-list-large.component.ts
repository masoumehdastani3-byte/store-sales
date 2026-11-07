import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';

@Component({
  selector: 'app-product-list-large',
  templateUrl: './product-list-large.component.html',
  styleUrls: ['./product-list-large.component.css'],
  providers: [ProductService, ConfigService]
})
export class ProductListLargeComponent implements OnInit {

  constructor(public productService: ProductService, public configService: ConfigService, public them: them, public router: Router) { }
  @Input() products: Product[];
  @Input() IsHomePage: boolean = false;
  @Input() type: string = '';
  page: string = '';
  @Input() ComparisonProduct: Product[] = [];
  ngOnInit() {

  }
  public onProductDetail(id: string, type: string) :string{

    var url = this.productService.RouterProductDetail(id, type, this.IsHomePage)
    return url;


  }
  //------------Add to basket-----------------------------------------------
  async onSelectProductOrder(ProductID: Number) {


    await this.productService.onSelectProductOrder(Number(ProductID)).then(a => {

      this.router.navigate(['/basket']);
    });


  }
  onSelectCompar() {
    this.ComparisonProduct = this.products.filter(a => a.Comparison == true);
    let ss = 800;
    if (this.page != 'home') {
      ss = 450;
    }
    window.scroll({
      top: ss,
      behavior: 'smooth'
    });
  }
}
