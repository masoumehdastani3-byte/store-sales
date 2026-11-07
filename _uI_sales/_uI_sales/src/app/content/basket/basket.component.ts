import { Component, OnInit, Injectable } from '@angular/core';


import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';
import { PaymentRequestResponseModel } from '../../shared/modules/Order.module';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../../shared/service/product.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
 
})
export class BasketComponent implements OnInit {

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
  public _ComparisonProduct: Product[] = [];
 
  CustomerForm: FormGroup;
  UserComment: FormGroup;
  loadAPI: Promise<any>;

  
  SY: number = 0;
  ProductID: string;
  TotalDiscount: Number;
  RequestResponse: PaymentRequestResponseModel;

  constructor(private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private configService: ConfigService,
    public them: them,
    public router: Router,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    
  }

  ngOnInit() {

    this.UserName = '';

    this.Lang = this.productService.Lang
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem('basket'));
      if (data != null && data != undefined) {
        this.productService.Order = data;
        this.recalculateOrderTotals();
        this.them.TotalShopping = this.productService.Order.OrderDetails.length.toString();
        localStorage.setItem("basketcount", JSON.stringify(this.them.TotalShopping));
        this.them.loading = false;
      }
      
    }, 2000);
    
    //--------------صفحه سبد خرید
    this.productService.onPageGroupSelect(3);


    this.CustomerForm = this.formBuilder.group({
      CodeMelli: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      FullName: ['', [Validators.required]],
      Description: [''],
      CustomerID: [null],
      City: ['', [Validators.required]],
      Confirm: [false, [Validators.required]]
    }, {
      validator: this.ValidConfirm()
    });
    this.UserComment = this.formBuilder.group({
      FullName: [''],
      Description: ['', [Validators.required]],
      ProductID: ['']
    });
   
  }//End ngOnInit

  /** Recalculate basket totals from line items (net payable). */
  recalculateOrderTotals() {
    const details = (this.productService.Order && this.productService.Order.OrderDetails) || [];
    let gross = 0;
    let discount = 0;
    details.forEach(item => {
      const count = Number(item.ShoppingCount) || 0;
      const unit = Number(item.UnitPrice) || 0;
      const lineDiscount = Number(item.TotalDiscount) || 0;
      gross += unit * count;
      // TotalDiscount may be per-line or per-unit depending on how item was added
      discount += lineDiscount <= unit ? lineDiscount * count : lineDiscount;
    });
    if (discount > gross) {
      discount = gross;
    }
    this.TotalDiscount = discount;
    this.Total = gross - discount;
    this.productService.Order.TotalDiscount = discount;
    this.productService.Order.Total = this.Total;
  }

  scrollPage(scroll: any) {

    window.scroll({
      top: scroll,
      behavior: 'smooth'
    });
  }
 
  get formControlsCustomer() { return this.CustomerForm.controls; }
  get formControlsUserComment() { return this.UserComment.controls; }
  //------------Add to basket-----------------------------------------------
  //-------افزودن به سبد خرید*********************************************
  onSelectProductOrder(ProductID: Number) {

    this.configService.Fetch_FilterProductID(this.Lang, this.UserName, ProductID.toString()).subscribe(data => {



      let count = this.productService.Order.OrderDetails.filter(a => a.ProductID == ProductID).length;


      let OrderDetail = {
        ProductID: data[0].ID,
        ProducName: data[0].Name,
        ShoppingCount: Number(count + 1),
        AvalaibleCount: Number(data[0].AvailableCount),
        UnitPrice: data[0].PriceSales,
        TotalPrice: Number(data[0].PriceSales) * Number(count + 1),
        TotalDiscount: Number(data[0].DiscountPrice) * Number(count + 1),
        Total: 0,
        OrderID: null,
        CompanyID: this.them.CompanyID

      }

      //const sum = this.productService.Order.OrderDetails.reduce((sum, current) => sum + Number(current.UnitPrice) * Number(current.ShoppingCount), 0);

      if (OrderDetail.AvalaibleCount >= OrderDetail.ShoppingCount) {
        this.productService.Order.OrderDetails.push(OrderDetail);

        this.Total = this.productService.Order.OrderDetails.reduce((sum, current) => sum + Number(current.UnitPrice) * Number(current.ShoppingCount), 0);
        this.TotalDiscount = this.productService.Order.OrderDetails.reduce((sum, current) => sum + Number(current.TotalDiscount), 0);
        this.Total = Number(this.Total) - Number(this.TotalDiscount)
        //-------------------------------
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
        //----------------------------
        this.them.TotalShopping = this.productService.Order.OrderDetails.length.toString();
      }
      else {
        if (this.them.Lang == 'fa') {
          Swal.fire({
            title: 'خطا!',
            text: 'موجودی محصول کافی نیست',
            icon: 'error',
            confirmButtonText: 'تایید',
            confirmButtonColor: this.them.ButtonColor,
          })

        }
        else {
          Swal.fire({
            title: 'Error!',
            text: 'product inventory is not enough',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: this.them.ButtonColor,
          })
        }


      }
    });
  }




  AddBasket() {
   
    window.scroll({
      top: 350,
      behavior: 'smooth'
    });
    //---------------نمایش همه لیست-----------------------
    //if (this.Product.length == 0) {
    //  this.SearchProduct(null);
    //}

  }
  onCloseDetails() {

  
    window.scroll({
      top: 350,
      behavior: 'smooth'
    });
    //---------------نمایش همه لیست-----------------------
    //if (this.Product.length == 0) {
    //  this.SearchProduct(null);
    //}
  }
 
  DeleteBasket(ProductID: Number) {
    this.productService.Order.OrderDetails = this.productService.Order.OrderDetails.filter(a => a.ProductID != ProductID);
    this.recalculateOrderTotals();
    this.them.TotalShopping = this.productService.Order.OrderDetails.length.toString();

    localStorage.clear();
    localStorage.setItem("basket", JSON.stringify(this.productService.Order));
  }
  AvalaibleCount() {
    this.productService.Order.OrderDetails.forEach(a => {
      if (a.AvalaibleCount < a.ShoppingCount) {
        a.ShoppingCount = a.AvalaibleCount;
        if (this.them.Lang == 'fa') {
          Swal.fire({
            title: 'خطا!',
            text: 'موجودی محصول کافی نیست',
            icon: 'error',
            confirmButtonText: 'تایید',
            confirmButtonColor: this.them.ButtonColor,
          })

        }
        else {
          Swal.fire({
            title: 'Error!',
            text: 'product inventory is not enough',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: this.them.ButtonColor,
          })

        }
      }

    });
    this.recalculateOrderTotals();
    localStorage.setItem("basket", JSON.stringify(this.productService.Order));
  }
  onSearchCustomer(Mobile: string, Email: string, CodeMelli: string) {
    this.configService.Fetch_FilterCustomerGet(this.Lang, '', null, this.them.CompanyID, Mobile, Email, '', CodeMelli).subscribe(data => {

      this.formControlsCustomer.Address.patchValue(data[0].Address);

      this.formControlsCustomer.City.patchValue(data[0].City);

      this.formControlsCustomer.CustomerID.patchValue(data[0].ID);

      this.formControlsCustomer.FullName.patchValue(data[0].FullName);

    })
  }
  SaveOrder(paymentGateway: number = 1) {
    this.isSubmitted = true;


    if (this.CustomerForm.invalid) {
      return;
    }
    else {
      this.recalculateOrderTotals();
      if (!this.productService.Order.OrderDetails || this.productService.Order.OrderDetails.length === 0) {
        Swal.fire({
          title: 'خطا!',
          text: 'سبد خرید خالی است',
          icon: 'error',
          confirmButtonText: 'تایید',
          confirmButtonColor: this.them.ButtonColor,
        });
        return;
      }
      if (Number(this.productService.Order.Total) <= 0) {
        Swal.fire({
          title: 'خطا!',
          text: 'مبلغ قابل پرداخت معتبر نیست',
          icon: 'error',
          confirmButtonText: 'تایید',
          confirmButtonColor: this.them.ButtonColor,
        });
        return;
      }

      this.them.loading = true;
      this.productService.Order.Address = this.CustomerForm.controls.Address.value;
      this.productService.Order.City = this.CustomerForm.controls.City.value;
      this.productService.Order.CustomerID = this.CustomerForm.controls.CustomerID.value;
      this.productService.Order.FullName = this.CustomerForm.controls.FullName.value;
      this.productService.Order.Description = this.CustomerForm.controls.Description.value;
      this.productService.Order.Email = this.CustomerForm.controls.Email.value;
      this.productService.Order.Mobile = this.CustomerForm.controls.Mobile.value;
      this.productService.Order.CodeMelli = this.CustomerForm.controls.CodeMelli.value;
      this.productService.Order.CompanyID = this.them.CompanyID;
      this.productService.Order.PaymentGateway = paymentGateway;
      localStorage.setItem("basket", JSON.stringify(this.productService.Order));
      this.configService.InsertOrder(this.productService.Order).subscribe(data => {
        this.them.loading = false;
        //------------درگاه نداشته باشد.
        if (data.status == 10) {
          if (this.Lang == 'fa') {
            Swal.fire({
              title: 'پیغام!',
              text: 'با تشکر ، نظر شما با موفقیت ثبت شد سفارش شما با موفقیت ثبت شد به زودی با شما تماس گرفته خواهد شد',
              icon: 'success',
              confirmButtonText: 'تایید',
              confirmButtonColor: this.them.ButtonColor,
            })

          }
          else {
            Swal.fire({
              title: 'Message!',
              text: 'Your order has been successfully registered and you will be contacted soon',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: this.them.ButtonColor,
            })

          }
        }//------------اگر خطا در بانک صورت گرفته شده باشد.
        else if (data.status == 0 && data.location) {
          localStorage.removeItem('basket');
          localStorage.removeItem('basketcount');
          document.location.href = data.location;
        }
        else if (data.status == -1 || data.Message) {
          Swal.fire({
            title: 'خطا!',
            text: data.Message || 'خطا در اتصال به درگاه پرداخت',
            icon: 'error',
            confirmButtonText: 'تایید',
            confirmButtonColor: this.them.ButtonColor,
          });
        }



        //this.router.navigate(['/shopping-basket'], { queryParams: { id: data[0].CustomerID } });
      }, err => {
        this.them.loading = false;
        Swal.fire({
          title: 'خطا!',
          text: 'ثبت سفارش یا اتصال به درگاه با خطا مواجه شد',
          icon: 'error',
          confirmButtonText: 'تایید',
          confirmButtonColor: this.them.ButtonColor,
        });
      });



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

 
  public onProductDetail(id: string, type: string): string {

    var url = this.productService.RouterProductDetail(id, type, false)
    return url;


  }
}



