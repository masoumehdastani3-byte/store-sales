import { Component, OnInit,Input } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';

@Component({
  selector: 'app-easy-search',
  templateUrl: './easy-search.component.html',
  styleUrls: ['./easy-search.component.css']
})
export class EasySearchComponent implements OnInit {

  @Input() BasicDataParam6:any
  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

}
