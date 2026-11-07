
import { Component, OnInit, Injectable } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';
import { PaymentRequestResponseModel } from '../../shared/modules/Order.module';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],

})
@Injectable()
export class SearchResultComponent implements OnInit {
  UserName: string;
  Lang: string;
  ParamName: string = "Re";
  ProductGroup: string = '0';
  visibleBasket: boolean = false;
  visibleDetails: boolean = false;
  isSubmitted: boolean = false;
  isSubmittedComment: boolean = false;
  Total: Number = 0;
  id: string = '0';
  basket: string = '0';
  public Product: Product[] = [];
  public ProductDetails: Product[] = [];
  public ProductGroupBy: Product[] = [];
  public _ComparisonProduct :Product[]=[];
  public Vertical:boolean=true;
  CustomerForm: FormGroup;
  UserComment: FormGroup;
  loadAPI: Promise<any>;
  
  OrderByColumn: string = 'PriceSales';
  OrderDirection: string = '1';
  activeSort: string = 'Arzan';
  SY: number=0;
  ProductID: string;
  TotalDiscount:Number;
  RequestResponse:PaymentRequestResponseModel;

  constructor(private activatedRoute: ActivatedRoute, public productservice: ProductService, private configService: ConfigService, public them: them, public router: Router, private formBuilder: FormBuilder) {


  }
  
  ngOnInit() {

    this.UserName = '';

    this.Lang = this.productservice.Lang;
    //this.activatedRoute.params.subscribe(params => {
    //  this.ProductGroup = params['ProductGroup'];
    //  this.basket = params['basket'];

    //});
    //---------queryParams
    this.activatedRoute.params.subscribe(params => {
      this.visibleDetails = false;
      this.visibleBasket = false;
      var SS = history.state;
      this.ParamName = SS.DATA;
      var History = history.state;
      
      this.id = History.id;
      this.ProductGroup = params['ProductGroup'];
      this.basket = params['basket'];
      
      var ProductGroupName = params['ProductGroupName'];
      
      //-------------از فرم جزییات وارد این صفحه شده است
      if (this.ProductGroup == undefined) {
        
        this.ProductGroup = History.ProductGroup;
        this.basket = History.basket;
        ProductGroupName = History.ProductGroupName
        let ScrollY=this.them.ScrollY;
        let time=1000;
        if(History !=null && History!=undefined)
        {
          time=2000;
        }
        setTimeout(function() { 
          window.scroll({
            top: ScrollY
          
        }); 
      } , time);
      }
      else{
        this.them.PageNumber='1';
        this.them.ScrollY=0;
      }
      
      
     
      this.them.ProductGroup = this.ProductGroup;
      this.them.ProductGroupName = ProductGroupName;
      this.Product = [];
      this.productservice.ParamShowSearch = [];

      this.productservice.OnParamShowSearch('', this.them.ProductGroup, null);


      this.productservice.Param1 = History.Param1;
      this.productservice.Param2 = History.Param2;
      this.productservice.Param3 = History.Param3;
      this.productservice.Param4 = History.Param4;
      this.productservice.Param5 = History.Param5;

      this.SearchProduct(null);
      this.productservice.onPaggingSelect(this.them.CompanyID, this.them.ProductGroup);
     
    });
    //---------End queryParams



    //---------------صفحه نتیجه جستجو
    this.productservice.onPageGroupSelect(2);
    //--------------صفحه سبد خرید
    this.productservice.onPageGroupSelect(3);


    this.CustomerForm = this.formBuilder.group({
      CodeMelli: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      FullName: ['', [Validators.required]],
      Description: [''],
      CustomerID: [null],
      City: ['', [Validators.required]],
      Confirm: [false, [Validators.required]]}, {
        validator: this.ValidConfirm()
    });
    this.UserComment = this.formBuilder.group({
      FullName: [''],
      Description: ['', [Validators.required]],
      ProductID: ['']
    });
  }//End ngOnInit
  
  scrollPage(SS:any){
   
    window.scroll({
      top: SS,
      behavior: 'smooth'
    });
  }  
  public SearchProduct(ProductID: string) {
    this.Product = [];
    this._ComparisonProduct = [];
    if (ProductID == 'param') {
      this.productservice.Paggin = [];
      ProductID = null;
    }
    this.Product = this.productservice.SearchProduct(ProductID, this.them.PageNumber, this.OrderByColumn, this.OrderDirection);

  }

  onSortBy(OrderByColumn: string, OrderDirection: string, sortKey: string) {
    this.OrderByColumn = OrderByColumn;
    this.OrderDirection = OrderDirection;
    this.activeSort = sortKey;
    this.SearchProduct(null);
  }
  onSelectPaggingPrevious(paggingNumber: Number)
  {
    
    paggingNumber = (Number(this.them.PageNumber) + Number(paggingNumber));
    if(paggingNumber<=0)
    {
      paggingNumber=1;
    }

    this.onSelectPagging(paggingNumber);
  }
  onSelectPagging(paggingNumber: Number) {
    
    
    this.them.PageNumber = paggingNumber.toString();
    
    this.SearchProduct(null);

    

  }

  get formControlsCustomer() { return this.CustomerForm.controls; }
  get formControlsUserComment() { return this.UserComment.controls; }
 
  
  onCloseDetails() {
    
    this.visibleBasket = false;
    window.scroll({
      top: 350,
      behavior: 'smooth'
    });
    //---------------نمایش همه لیست-----------------------
    if (this.Product.length == 0) {
      this.SearchProduct(null);
    }
  }
  
  ValidConfirm() {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls["Confirm"];
        
        if (control.errors) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value == false) {
          control.setErrors({ ValidConfirm: true });
        } else {
          control.setErrors(null);
        }
    }
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
      this.productservice.InsertProductUserComment(params);
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
  public onProductDetail(id: Number) {

    this.them.ScrollY=window.scrollY;
    this.router.navigate(['/p/' + id]);

  }
}



