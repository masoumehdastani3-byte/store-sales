import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../shared/service/product.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';
import { takeWhile, tap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { DomSanitizer, Title  } from '@angular/platform-browser';






@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../../../assets/main.css', './home-page.component.css'],
  providers: [ProductService, ConfigService]

})


export class HomePageComponent implements OnInit {
  public Product: Product[] = [];
  public ProductNew: Product[] = [];
  public Vertical:boolean=true;

  constructor(public productService: ProductService, public configService: ConfigService, public them: them, public router: Router, public sanitizer: DomSanitizer, public titleService: Title) { }

  ngOnInit() {
    this.them.ScrollY=0;
    //--------------------عنوان صفحه مشخص شود---------------------------
    this.titleService.setTitle(this.them.CompanyName);
    //------------نمایش پیشنهاد های وِیژه-----------------------------------------------------
    this.Product = this.productService.OnFetchProductSelect(this.them.Lang.toString(), '', '', 'true', '', '', this.them.CompanyID, '', '', 'false',null,null,null)
    this.ProductNew = this.productService.OnFetchProductSelectNew(this.them.Lang.toString(), '', '', 'false', '', '', this.them.CompanyID, '', '', 'true', null, null, null)

    this.productService.OnParamShowSearchHomePage();
    //---------------صفحه اصلی
    this.productService.onPageGroupSelect(1);
    //--------------نمایش متن در تصویر
    this.productService.onPageGroupSelect(7);
    this.productService.GetProducGroup();
  }

  public SearchProduct() {
   
    this.router.navigate(['/search-result'],
      {
        state: {
          DATA: this.productService.ParamNameString(),
          Param1: this.productService.Param1,
          Param2: this.productService.Param2,
          Param3: this.productService.Param3,
          Param4: this.productService.Param4,
          Param5: this.productService.Param5,
          
          ProductGroup: this.them.ProductGroupForFirst,
          basket: 0,
          ProductGroupName: this.them.ProductGroupName
        },

      });

  }
  


  scrollLeft(el: Element) {
    const animTimeMs = 400;
    const pixelsToMove = 370;
    const stepArray = [0.001, 0.021, 0.136, 0.341, 0.341, 0.136, 0.021, 0.001];
    interval(animTimeMs / 8)
      .pipe(
        takeWhile(value => value < 8),
        tap(value => el.scrollLeft -= (pixelsToMove * stepArray[value])),
      )
      .subscribe();
  }

  scrollRight(el: Element) {
    const animTimeMs = 400;
    const pixelsToMove = 370;
    const stepArray = [0.001, 0.021, 0.136, 0.341, 0.341, 0.136, 0.021, 0.001];
    interval(animTimeMs / 8)
      .pipe(
        takeWhile(value => value < 8),
        tap(value => el.scrollLeft += (pixelsToMove * stepArray[value])),
      )
      .subscribe();
  }
 async onSelectProductOrder(ProductID: Number) {

    
   await this.productService.onSelectProductOrder(Number(ProductID)).then(a => {
      
      this.router.navigate(['/basket']);
    });
    

  }
  public onProductDetail(id: string,type:string):string {
    
    var url=  this.productService.RouterProductDetail(id,type,true)
    return url
    
   }
}
