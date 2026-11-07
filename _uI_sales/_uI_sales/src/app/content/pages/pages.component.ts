import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { them } from '../../shared/service/themplate.service';
import { ProductService } from '../../shared/service/product.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
@Injectable()
export class PagesComponent implements OnInit {
  

  constructor(private router: Router, public them: them, public service: ProductService, private activatedRoute: ActivatedRoute) { }
  page: String='';
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
     
      
      if (params['id'] != undefined) {
        this.page=this.service.onPageSelect(params['id']);

      }

    });
  }

}
