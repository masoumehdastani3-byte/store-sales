import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';

import { OrderDetails } from '../../shared/modules/Order.module';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { Purchase } from '../../shared/modules/Purchase.module';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css'],
  providers: [ProductService, ConfigService]
})
export class MyPurchasesComponent implements OnInit {

  UserName: string;
  Lang: string;
  CustomerID: string;
  FullName: string;
  Purchase: Purchase[] = [];
  Total: Number = 0;
  TotalDiscount: Number = 0;
  constructor(private productservice: ProductService,
              private configService: ConfigService,
              public titleService: Title,
              public them: them,
              public router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.UserName = '';
    //--------------------عنوان صفحه مشخص شود---------------------------
    this.titleService.setTitle(this.them.CompanyName);
    this.Lang = this.productservice.Lang;
    this.activatedRoute.queryParams.subscribe(params => {
      this.CustomerID = params['id'] || params['Id'];
      if (this.CustomerID) {
        this.Select();
      }
    });

    //--------------صفجه خرید های من
    this.productservice.onPageGroupSelect(6);
  }

  Select() {
    if (!this.CustomerID) {
      return;
    }
    this.them.loading = true;
    this.configService.Fetch_FilterPurchaseGet(this.Lang, this.UserName, null, this.them.CompanyID, this.CustomerID, null, null, null, null).subscribe(data => {
      this.Purchase = data || [];
      if (this.Purchase.length > 0) {
        this.Total = this.Purchase.reduce((sum, current) => sum + Number(current.UnitPrice) * Number(current.ShoppingCount), 0);
        this.TotalDiscount = this.Purchase.reduce((sum, current) => sum + Number(current.TotalUnitDisount), 0);
        this.Total = Number(this.Total) - Number(this.TotalDiscount);
        this.FullName = data[0].FullName;
      } else {
        this.Total = 0;
        this.TotalDiscount = 0;
        this.FullName = '';
      }
      this.them.loading = false;
    }, () => {
      this.them.loading = false;
    });

  }

}
