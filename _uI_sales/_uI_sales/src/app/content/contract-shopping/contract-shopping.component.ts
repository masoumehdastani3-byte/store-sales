import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { ConfigService } from '../../shared/service/api.service';
import { Product } from '../../shared/modules/Product.module';
import { them } from '../../shared/service/themplate.service';

import { OrderDetails } from '../../shared/modules/Order.module';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../shared/modules/Order.module';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contract-shopping',
  templateUrl: './contract-shopping.component.html',
  styleUrls: ['./contract-shopping.component.css']
})
export class ContractShoppingComponent implements OnInit {
  CustomerForm: FormGroup;
  isSubmitted: boolean = false;
  UserName: string;
  Lang: string;
  constructor(public productservice: ProductService,private configService: ConfigService, public them: them, public router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.UserName = '';

    this.Lang = this.them.Lang.toString();
    this.CustomerForm = this.formBuilder.group({

      CodeMelli: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
     

    });
  }
  get formControlsCustomer() { return this.CustomerForm.controls; }
  onSubmit() {
    
    this.isSubmitted = true;
    if (this.CustomerForm.invalid) {
      return;
    }
    else {
      this.them.loading = true;
      
      this.configService.Fetch_FilterCustomerGet(this.Lang ,this.UserName , null,  this.them.CompanyID, this.CustomerForm.controls.Mobile.value, null, null,this.CustomerForm.controls.CodeMelli.value).subscribe(data => {
        this.them.loading = false;
        if (data.length > 0) {
          this.router.navigate(['/my-purchases'], { queryParams: { id: data[0].ID } });
        }
        else {
          if (this.Lang == 'fa') {
            Swal.fire('خطا', 'کاربری با این مشخصات یافت نشد');
          }
          else {
            Swal.fire('Error', 'No user with this profile was found');
          }
          
        }
        
      });



    }
  }
}
