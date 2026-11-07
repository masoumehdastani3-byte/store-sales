import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/service/product.service';
import { them } from '../shared/service/themplate.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public service: ProductService, public them: them) { }
 
  ngOnInit() {
     
  }

}
