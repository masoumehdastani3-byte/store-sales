import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { them } from './shared/service/themplate.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnInit {


  language: string = this.them.DefaultLanguage.toString();


  constructor(private translate: TranslateService, public them: them) {

    this.language = localStorage.getItem('language')


    if (this.language != null) {
      translate.setDefaultLang(this.language.toString());
    }
    else {
      translate.setDefaultLang(this.them.DefaultLanguage.toString());
      localStorage.setItem('language', this.them.DefaultLanguage.toString());
      this.language = this.them.DefaultLanguage.toString();
    }

    
  }

  ngOnInit() {
   
    this.them.loading = false;
    const bootFa = document.getElementById('boot_fa') as HTMLLinkElement;
    const bootEn = document.getElementById('boot_en') as HTMLLinkElement;
    const panelFa = document.getElementById('Panel_fa') as HTMLLinkElement;
    const panelEn = document.getElementById('Panel_en') as HTMLLinkElement;

    const isFa = this.language !== 'en';
    document.documentElement.setAttribute('lang', isFa ? 'fa' : 'en');
    document.documentElement.setAttribute('dir', isFa ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', isFa ? 'rtl' : 'ltr');
    if (bootFa) { bootFa.disabled = !isFa; }
    if (bootEn) { bootEn.disabled = isFa; }
    if (panelEn) { panelEn.disabled = true; }
    if (panelFa) { panelFa.disabled = true; }

    let basketCount = localStorage.getItem('basketCount');
    this.them.TotalShopping = basketCount;
  }



  
}




