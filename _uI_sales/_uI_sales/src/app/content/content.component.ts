
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { them } from '../shared/service/themplate.service';
import { ProductService } from '../shared/service/product.service';
import { DomSanitizer, Title } from '@angular/platform-browser'


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  
})
//@Pipe({ name: 'safeHtml' })
@Injectable()
export class ContentComponent implements OnInit {
  href: string = "";
  UserName: string;
  Lang: string;


  
  constructor(private router: Router, public them: them, public service: ProductService,
    public titleService: Title, private sanitizer: DomSanitizer) {
      
  }

  ngOnInit() {

    this.href = this.router.url;
    if (this.href == '/') {

      this.router.navigate(['/home-page'])
    }
    this.service.onSelectCompany(this.titleService); //titleService جهت مشخص کردن عنوان سایت
    

  }
  whatsappURL() {
    let width = screen.width;
    if(width<600)
    {
      return this.sanitizer.bypassSecurityTrustUrl("whatsapp://send?phone="+this.service.Company.WatsUpNumber);
    }
    else{
      return this.sanitizer.bypassSecurityTrustUrl("https://web.whatsapp.com/send?phone="+this.service.Company.WatsUpNumber);
    }
    
  }

}
