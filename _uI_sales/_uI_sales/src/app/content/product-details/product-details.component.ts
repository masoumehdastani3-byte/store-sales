import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  

  constructor(public activatedRoute: ActivatedRoute, public productService: ProductService, public them: them, public router: Router, private formBuilder: FormBuilder, public titleService: Title) {

  }
  UserComment: FormGroup;
  UserName: string;
  Lang: string;
  ParamName: string = "Re";
  ProductGroup: string = '0';
  isSubmittedComment: boolean = false;
  page :string='';
  id: string = '';
  SY: string = '';
  public ProductDetails: Product[] = [];


  loadAPI: Promise<any>;
  PageNumber: string = '1';
  OrderByColumn: string = 'PriceSales';
  OrderDirection: string = '1';
  ProductID: string;
  
  ngOnInit() {

    this.UserName = '';
    this.Lang = this.productService.Lang;
    //اگر از آدرس تلگرام وارد ساید شود
    
    // this.id = this.activatedRoute.snapshot.params['id'];
    // this.page=this.activatedRoute.snapshot.params['page'];
    //اگر از خود سایت جزییات دیده شود

    this.activatedRoute.params.subscribe(params => {
      this.id =params['id'];
      this.page=params['page'];
      
      this.productService.ProductSearch=[];
      this.SearchProduct(this.id);
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    });
    

    
    //---------End queryParams
    this.UserComment = this.formBuilder.group({

      FullName: [''],
      Description: ['', [Validators.required]],
      ProductID: ['']

    });

  }//End ngOnInit

  get formControlsUserComment() { return this.UserComment.controls; }
  //-----------------------------------------------------
  public SearchProduct(ProductID: string) {

    this.ProductDetails = [];

    this.ProductID = ProductID;
    this.productService.SelectProductComment(ProductID);

    this.ProductDetails = this.productService.SearchProduct(ProductID, this.PageNumber, this.OrderByColumn, this.OrderDirection);
    //------------محصولات مشابه
    this.productService.SearchSameProduct(ProductID)
  }


  zoom(e) {

    
    var zoomer = e.currentTarget;
    var offsetX;
    var offsetY;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    var x = offsetX / zoomer.offsetWidth * 100
    var y = offsetY / zoomer.offsetHeight * 100

    
    document.getElementById('zoom1').style.backgroundPosition = x + '% ' + y + '%';
     
  }
  SaveUserComment() {
    this.isSubmittedComment = true;
    if (this.UserComment.invalid) {
      return;
    }
    else {
      var params: any = {

        CompanyID: this.them.CompanyID,
        Description: this.UserComment.controls.Description.value,
        FullName: this.UserComment.controls.FullName.value,
        Lang: this.them.Lang,
        ProductID: this.ProductID,
      }
      this.productService.InsertProductUserComment(params);
      this.UserComment.reset();
      this.isSubmittedComment = false;
      if (this.them.Lang == 'fa') {
        Swal.fire({
          title: 'پیغام!',
          text: 'با تشکر ، نظر شما با موفقیت ثبت شد',
          icon: 'success',
          confirmButtonText: 'تایید',
          confirmButtonColor: this.them.ButtonColor,
        })




      }
      else {
        Swal.fire({
          title: 'Message!',
          text: 'Thank you, your comment was successfully submitted',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: this.them.ButtonColor,
        })

      }
    }
  }
  //------------Add to basket-----------------------------------------------
  async onSelectProductOrder(ProductID: Number) {

    
   await this.productService.onSelectProductOrder(Number(ProductID)).then(a => {
      
      this.router.navigate(['/basket']);
    });
    

  }

  backToList() {
    if (this.page === 'home') {
      this.router.navigate(['/home-page']);
      return;
    }
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    this.router.navigate(['/home-page']);
  }

  scrollRelated(el: HTMLElement, direction: number) {
    if (!el) {
      return;
    }
    el.scrollBy({ left: direction * 280, behavior: 'smooth' });
  }
}
