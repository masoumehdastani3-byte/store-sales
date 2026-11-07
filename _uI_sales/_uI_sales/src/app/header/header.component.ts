import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { them } from '../shared/service/themplate.service';
import { ProductService } from '../shared/service/product.service';
import { } from '../shared/service/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']


})
export class HeaderComponent implements OnInit {


  UserName: string;
  Lang: string;
  public fixed: boolean = false;
  state = 'noraml';
  //https://medium.com/@mustafasaeed007/angular-localization-to-support-right-to-left-languages-7225a6c71eef تغییر زبان
  constructor(@Inject(DOCUMENT) private doc: Document, private translate: TranslateService, public them: them, public service: ProductService) { }

  ngOnInit(): void {

    this.Lang = this.service.Lang;
    this.onWindowScroll();
    
  }

  @HostListener('window:scroll', [])

  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    if (number > 100) {
      this.fixed = true;
    } else if (this.fixed && number < 10) {
      this.fixed = false;
    }
  }
  //-------------ChangeLanguage-------------------------
  useLanguage(language: string) {
    //let htmlTag = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    //    htmlTag.dir = language === "fa" ?"rtl" : "ltr";
    this.translate.use(language);
  }
  
  
}
