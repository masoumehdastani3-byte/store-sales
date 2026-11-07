import { Component, Input } from '@angular/core';
import { them } from '../../shared/service/themplate.service';
import { ProductService } from '../../shared/service/product.service';
import { Product } from '../../shared/modules/Product.module';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent   {

 
  @Input() Product:Product;
  constructor(public productService: ProductService, public them: them) {

  }

 

}
