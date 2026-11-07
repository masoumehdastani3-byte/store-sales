import { Component, OnInit,Input } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';

@Component({
  selector: 'app-product-list-small',
  templateUrl: './product-list-small.component.html',
  styleUrls: ['./product-list-small.component.css'],
  providers: [ProductService, ConfigService]
})
export class ProductListSmallComponent implements OnInit {
  
  constructor(public productService: ProductService, public configService: ConfigService, public them: them, public router: Router) { }
  @Input() products:Product[];
  @Input() IsHomePage :boolean=false;
  @Input() type:string='';
  ngOnInit() {
  }
  public onProductDetail(id: string,type:string) {
    
    this.productService.RouterProductDetail(id,type,this.IsHomePage)
    
    
   }
}
