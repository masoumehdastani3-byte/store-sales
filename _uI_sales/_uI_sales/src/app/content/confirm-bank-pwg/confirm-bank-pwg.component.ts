import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirm-bank-pwg',
  templateUrl: './confirm-bank-pwg.component.html',
  styleUrls: ['./confirm-bank-pwg.component.css']
})
export class ConfirmBankPWGComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public router: Router) {


  }
  quotes: Object;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params");
      console.log(params);
    });
    
  }

}
