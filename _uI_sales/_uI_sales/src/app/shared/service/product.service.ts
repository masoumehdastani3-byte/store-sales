import { Injectable, APP_INITIALIZER, FactoryProvider} from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { BasicData } from '../../shared/modules/BasicData.module';
import { Product } from '../../shared/modules/Product.module';
import { ProductDetails } from '../../shared/modules/Product.module';
import { BasicDataParam1 } from '../../shared/modules/BasicData.module';
import { BasicDataParam2 } from '../../shared/modules/BasicData.module';
import { BasicDataParam3 } from '../../shared/modules/BasicData.module';
import { BasicDataParam4 } from '../../shared/modules/BasicData.module';
import { BasicDataParam5 } from '../../shared/modules/BasicData.module';
import { BasicDataParam6 } from '../../shared/modules/BasicData.module';
import { ParamShowSearch } from '../../shared/modules/ParamShowSearch.module';
import { PageGenerator } from '../../shared/modules/PageGenerator.module';
import { MenuView } from '../../shared/modules/PageMenu.module';
import { ConfigService } from '../../shared/service/api.service';

import { them } from '../../shared/service/themplate.service';
import { Order } from '../../shared/modules/Order.module';
import { CompanyProductGroup } from '../../shared/modules/CompanyProductGroup.module';
import { Company } from '../modules/Company.module';
import { Paggin } from '../../shared/modules/Product.module';
import { Title } from '@angular/platform-browser'
import { ProductUserComment } from '../modules/ProductUserComment.module';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  public Order: Order = {
    Address: '',
    Description: '',
    Email: '',
    CodeMelli:'',
    FullName: '',
    Mobile: '',
    Lang: '',
    LogUser: '',
    City: '',
    Total: 0,
    CustomerID: null,
    TotalDiscount:0,
    CompanyID: this.them.CompanyID,

    OrderDetails: [],
  };
  
  public Lang: string = localStorage.getItem('language');
  public UserName: string = '';
  public loading = false;
  public BasicDataALL: BasicData[] = [];
  public ParamShowSearch: ParamShowSearch[] = [];
  public ProductSeptioal: Product[] = [];
  public ProductSearch: Product[] = [];
  public ProductGroupBy: Product[] = [];
  public ProductDetails: ProductDetails[] = [];
  public BasicDataParam1: BasicDataParam1[] = [];
  public BasicDataParam2: BasicDataParam2[] = [];
  public BasicDataParam3: BasicDataParam3[] = [];
  public BasicDataParam4: BasicDataParam4[] = [];
  public BasicDataParam5: BasicDataParam5[] = [];
  public BasicDataParam6: BasicDataParam5[] = [];

  public basicDataParam1: BasicDataParam1[] = [];
  public basicDataParam2: BasicDataParam2[] = [];
  public basicDataParam3: BasicDataParam3[] = [];
  public basicDataParam4: BasicDataParam4[] = [];
  public basicDataParam5: BasicDataParam5[] = [];

  public ProductNew: Product[] = [];
  public Product: Product[] = [];

  public Param1Show: boolean = false;
  public Param1ID: Number = null;
  public Param1: string = "";

  public Param2Show: boolean = false;
  public Param2ID: Number = null;
  public Param2: string = "";

  public Param3Show: boolean = false;
  public Param3ID: Number = null;
  public Param3: string = "";

  public Param4Show: boolean = false;
  public Param4ID: Number = null;
  public Param4: string = "";

  public ShowEasySeachID: string = "";

  public Param5Show: boolean = false;
  public Param5ID: Number = null;
  public Param5: string = "";
  public ParamName: string = "";
  public CompanyProductGroup: CompanyProductGroup[] = [];
  public ProductUserComment: ProductUserComment[] = [];
  
  public PageGenerator_0: PageGenerator[] = [];
  public PageGenerator_1: PageGenerator[] = [];
  public PageGenerator_2: PageGenerator[] = [];
  public PageGenerator_3: PageGenerator[] = [];
  public PageGenerator_4: PageGenerator[] = [];
  public PageGenerator_5: PageGenerator[] = [];
  public PageGenerator_6: PageGenerator[] = [];
  public PageGenerator_7: PageGenerator[] = [];
  public PageGenerator: PageGenerator
  public Company: Company;
  SY :number;
  public Paggin: Paggin[] = [];
  public oldCalssPaggingActive: string = 'a1';
  public MenuView: MenuView[] = [];
  private messageSource = new BehaviorSubject(this.ParamName);
  currentMessage = this.messageSource.asObservable();
  
  changeMessage(ParamName: string) {
    this.messageSource.next(ParamName)

  }
  onPaggingSelect(CompanyID: string,ProductGroupID) {
    this.configService.Fetch_FilterPageCount(CompanyID, ProductGroupID)
      .subscribe(data => {
        this.Paggin = data;
       
      });
  }
  onPCompanyProductGroup(Lang: string,  CompanyID: string) {
    this.configService.Fetch_FilterCompanyProductGroupGet(CompanyID,Lang)
      .subscribe(data => {
        this.CompanyProductGroup = data;
      });

    if (this.CompanyProductGroup.length > 0) {
      
      this.them.ProductGroupForFirst = this.CompanyProductGroup[0].ID.toString();
      alert(this.them.ProductGroupForFirst);
    }
    
  }
  
  public SearchProduct(ProductID: string, PageNumber: string, OrderByColumn: string, OrderDirection: string): Product[] {

    
    this.ParamName = this.ParamNameString();
    this.ProductSearch = [];
    this.ProductSearch = this.OnFetchProductSelect(this.Lang, '', '', '', this.them.ProductGroup, ProductID, this.them.CompanyID, '', this.ParamName, null, PageNumber, OrderByColumn, OrderDirection);
    
    return this.ProductSearch;

  }
  public ParamNameString(): string {
    
    if (this.Param1 === undefined) {
      this.Param1 = '';
    }
    if (this.Param2 === undefined) {
      this.Param2 = '';
    }
    if (this.Param3 === undefined) {
      this.Param3 = '';
    }
    if (this.Param4 === undefined) {
      this.Param4 = '';
    }
    if (this.Param5 === undefined) {
      this.Param5 = '';
    }
    this.ParamName = this.Param1
      + ',' + this.Param2
      + ',' + this.Param3
      + ',' + this.Param4
      + ',' + this.Param5;
    return this.ParamName;
  }

  public SearchProductByParameter(Lag: string, IsSpecialSales: string, ProductGroupID: string, CompanyID: string, Param: string, PageNumber: string, OrderByColumn: string, OrderDirection: string): Product[] {
    
    this.messageSource.next(Param);
    this.ProductSearch = [];
    this.ProductSearch = this.OnFetchProductSelect(Lag, '', '', IsSpecialSales, ProductGroupID, '', CompanyID, '', Param, null, PageNumber, OrderByColumn, OrderDirection);
    return this.ProductSearch;

  }
  //---------------------تغییر استایل دکمه های صفحه بندی
  ChangeStylePaggingButton(paggingNumber: Number){
    
    var element = document.getElementById('a' + paggingNumber);
    if(element!=undefined)
    {
      element.style.backgroundColor = this.them.PriceColor;
      element.style.color = this.them.PriceFontColor;
  
  
      if ('a' + paggingNumber != this.oldCalssPaggingActive) {
        var elementold = document.getElementById(this.oldCalssPaggingActive);
        elementold.style.backgroundColor = 'unset';
        elementold.style.color = 'unset'
      }
      this.oldCalssPaggingActive = 'a' + paggingNumber;
    }
    
  }
  constructor(private configService: ConfigService, private router: Router, public them: them, public titleService: Title) { }

  OnParamShowSearch(Lang: string, GroupType: string,WebSite:string) {
    
    this.configService.FetchParamShowSearch(Lang, GroupType,WebSite).subscribe(data => {
      
      this.ParamShowSearch=[];
      
      
      data.map(item => {
        return {
          
          GroupTypeName: item.GroupTypeName,
          ProductGroupID: Number(GroupType),
          IsShowSearch: true,
          IsShowEasySearch:item.IsShowEasySearch
        }
      }).forEach(item => this.ParamShowSearch.push(item));
        if(data.length>0)
        {
          this.them.ProductGroup=data[0].ProductGroupID.toString();
        }
      
      
      this.configService.FetchProductSpecificationSelect(Lang, '', this.them.ProductGroup,'',this.them.CompanyID).subscribe(data => {
        
        this.BasicDataALL = data;
        this.BasicDataParam6=[];
       
        this.BaseDataFliterLoad(this.ParamShowSearch[0].GroupTypeName, 'Param1', this.BasicDataALL,this.ParamShowSearch[0].IsShowEasySearch);
        this.basicDataParam1 = this.BasicDataParam1;

        this.BaseDataFliterLoad(this.ParamShowSearch[1].GroupTypeName, 'Param2', this.BasicDataALL,this.ParamShowSearch[1].IsShowEasySearch);
        this.basicDataParam2 = this.BasicDataParam2;

        this.BaseDataFliterLoad(this.ParamShowSearch[2].GroupTypeName, 'Param3', this.BasicDataALL,this.ParamShowSearch[2].IsShowEasySearch);
        this.basicDataParam3 = this.BasicDataParam3;

        this.BaseDataFliterLoad(this.ParamShowSearch[3].GroupTypeName, 'Param4', this.BasicDataALL,this.ParamShowSearch[3].IsShowEasySearch);
        this.basicDataParam4 = this.basicDataParam4;

        this.BaseDataFliterLoad(this.ParamShowSearch[4].GroupTypeName, 'Param5', this.BasicDataALL,this.ParamShowSearch[4].IsShowEasySearch);
        this.basicDataParam5 = this.BasicDataParam5;
       
      });
      

    });

    return new Observable((observer) => observer.next(this.ParamShowSearch));


  }

  OnParamShowSearchHomePage() {

    this.OnParamShowSearch(this.Lang, null, window.location.host)
   
  }


  OnFetchProductSelect(Lang: string, loguser: string, logIP: string, isSpecialSales: string, productGroupID: string, productID: string, companyID: string, stringParamGroupType: string, stringParamGroupName: string, IsNewCreate: string, PageNumber: string, OrderByColumn: string, OrderDirection: string): Product[] {
    let proc: Product[] = [];
    this.Product = [];
    
    this.them.loading = false;
    this.configService.FetchProductSelect(Lang, loguser, logIP, isSpecialSales, productGroupID, productID, companyID, stringParamGroupType, stringParamGroupName, IsNewCreate,PageNumber, OrderByColumn, OrderDirection).subscribe(data => {
      
      proc = data;
      proc.forEach(a => a.ProductDetails = []);

      //-----------------بدست آوردن یک نوع از هر محصول
      
      for (let i in proc) {
        
        let count = this.Product.filter(a => a.ID == proc[i].ID);
        if (count.length == 0) {


         
          let row = proc.find(a => a.ID == proc[i].ID);
          this.Product.push(row);
          let pdd = proc.filter(a => a.ID == proc[i].ID)
          for (let j in pdd) {
            
            
            let pd: ProductDetails = {
              Title: pdd[j].Title,
              GroupTypeName: pdd[j].GroupTypeName,

            }
            if(row.ProductDetails.filter(a=>a.GroupTypeName==pdd[j].GroupTypeName).length>0)
            {
              let title= row.ProductDetails.find(a=>a.GroupTypeName==pdd[j].GroupTypeName).Title;
              row.ProductDetails.find(a=>a.GroupTypeName==pdd[j].GroupTypeName).Title=title+' , '+pdd[j].Title
            }
            else
            {
              row.ProductDetails.push(pd);
            }

            


          }
        }
      }//End For
      let href= window.location.href;
     //---------------تغییر عنوان سایت----------------------------------------
      if(!href.includes("home-page"))
      {
        if (this.Product.length > 0 ) {

          this.titleService.setTitle(this.them.CompanyName + "|" + this.Product[0].ProductGroup_Title);
          
        }
        if (this.Product.length > 0 && productID!=null) {
         
          this.titleService.setTitle(this.them.CompanyName + "|" + this.Product[0].ProductGroup_Title + "|" + this.Product[0].Name);
          
        }
      }
      
      if(Number(PageNumber)>0)
      {
        this.ChangeStylePaggingButton(Number(PageNumber));
      }
      
      
     
      this.them.loading = false;
    }, err => {
      this.them.loading = false;
      //...
    });


   
    return this.Product;
  }
  OnFetchProductSelectNew(Lang: string, loguser: string, logIP: string, isSpecialSales: string, productGroupID: string, productID: string, companyID: string, stringParamGroupType: string, stringParamGroupName: string, IsNewCreate: string, PageNumber: string, OrderByColumn: string, OrderDirection: string): Product[] {
    let proc: Product[] = [];
    this.ProductNew = [];
    this.ProductGroupBy = [];
    this.them.loading = true;
    this.configService.FetchProductSelect(Lang, loguser, logIP, isSpecialSales, productGroupID, productID, companyID, stringParamGroupType, stringParamGroupName, IsNewCreate, PageNumber, OrderByColumn, OrderDirection).subscribe(data => {

      proc = data;
      proc.forEach(a => a.ProductDetails = []);

      //-----------------بدست آوردن یک نوع از هر محصول

      for (let i in proc) {

        let count = this.ProductGroupBy.filter(a => a.ID == proc[i].ID);
        if (count.length == 0) {



          let row = proc.find(a => a.ID == proc[i].ID);
          this.ProductGroupBy.push(row);
          let pdd = proc.filter(a => a.ID == proc[i].ID)
          for (let j in pdd) {


            let pd: ProductDetails = {
              Title: pdd[j].Title,
              GroupTypeName: pdd[j].GroupTypeName,

            }
            

            row.ProductDetails.push(pd);


          }
        }
      }

      this.ProductNew = proc;

      this.them.loading = false;
    }, err => {
      this.them.loading = false;
      //...
    });



    return this.ProductGroupBy;
  }

  public ShowListParam1(): void {

    this.Param1Show = !this.Param1Show;
    this.Param2Show=false;
    this.Param3Show=false;
    this.Param4Show=false;
    this.Param5Show=false;

  }
  public ShowListParam2(): void {
    this.Param2Show = !this.Param2Show;
    this.Param1Show=false;
    this.Param3Show=false;
    this.Param4Show=false;
    this.Param5Show=false;

  }
  public ShowListParam3(): void {
    this.Param3Show = !this.Param3Show;
    this.Param2Show=false;
    this.Param1Show=false;
    this.Param4Show=false;
    this.Param5Show=false;
  }
  public ShowListParam4(): void {
    this.Param4Show = !this.Param4Show;
    this.Param2Show=false;
    this.Param3Show=false;
    this.Param1Show=false;
    this.Param5Show=false;
  }
  public ShowListParam5(): void {
    this.Param5Show = !this.Param5Show;
    this.Param2Show=false;
    this.Param3Show=false;
    this.Param4Show=false;
    this.Param1Show=false;
  }

  
  public DataParam1Select(id, text): void {
    this.Param1Show = false;
    this.Param1 = text;
    this.Param1ID = id;
    document.getElementById('span1').style.display='block';
  }
  public ParamClose(id,param): void {
    document.getElementById(id).style.display='none';
    if(param=='Param1')
    {
      this.Param1 = '';
      this.Param1ID = null;
    }
    if(param=='Param2')
    {
      this.Param2 = '';
      this.Param2ID = null;
    }
    if(param=='Param3')
    {
      this.Param3 = '';
      this.Param3ID = null;
    }
    if(param=='Param4')
    {
      this.Param4 = '';
      this.Param4ID = null;
    }
    if(param=='Param5')
    {
      this.Param5 = '';
      this.Param4ID = null;
    }
  }

  public DataParam2Select(id, text): void {

    this.Param2Show = false;
    this.Param2 = text;
    this.Param2ID = id;
    document.getElementById('span2').style.display='block';

  }
  public DataParam3Select(id, text): void {

    this.Param3Show = false;
    this.Param3 = text;
    this.Param3ID = id;
    document.getElementById('span3').style.display='block';
  }
  public DataParam4Select(id, text): void {

    this.Param4Show = false;
    this.Param4 = text;
    this.Param4ID = id;
    document.getElementById('span4').style.display='block';

  }

  public DataParam5Select(id, text): void {

    this.Param5Show = false;
    this.Param5 = text;
    this.Param5ID = id;
    document.getElementById('span5').style.display='block';

  }
  public DataParam6Select(id, text,Param): void {

   
    if(Param=="Param1")
    {
      this.Param1 = text;
      this.Param1ID = id;
      document.getElementById('span1').style.display='block';
    }
    if(Param=="Param2")
    {
      this.Param2 = text;
      this.Param2ID = id;
      document.getElementById('span2').style.display='block';
    }
    if(Param=="Param3")
    {
      this.Param3 = text;
      this.Param3ID = id;
      document.getElementById('span3').style.display='block';
    }
    if(Param=="Param4")
    {
      this.Param4 = text;
      this.Param4ID = id;
      document.getElementById('span4').style.display='block';
    }
    if(Param=="Param5")
    {
      this.Param5 = text;
      this.Param5ID = id;
      document.getElementById('span5').style.display='block';
    }
    document.getElementById("search_button").click();

  }
  ComboName: string = "";
  public BasicDataFilter(event: KeyboardEvent) {

    let fillter = (event.target as HTMLInputElement).value;
    let ComboName = (event.target as HTMLInputElement).id;
    
    if (ComboName === "Param2") {
      this.Param2Show = true;
      this.Param1Show = false;
      this.Param3Show = false;
      this.Param4Show = false;
      this.Param5Show = false;


      this.basicDataParam2 = this.BasicDataParam2.filter(it => {

        return it.Title.toLowerCase().includes(fillter);

       
      });
    }

    if (ComboName === "Param1") {
      this.Param1Show = true;
      this.Param2Show = false;
      this.Param3Show = false;
      this.Param4Show = false;
      this.Param5Show = false;

      this.basicDataParam1 = this.BasicDataParam1.filter(it => {

        return it.Title.toLowerCase().includes(fillter);

        
      });
    }
    if (ComboName === "Param3") {
      this.Param3Show = true;
      this.Param1Show = false;
      this.Param2Show = false;
      this.Param4Show = false;
      this.Param5Show = false;

      this.basicDataParam3 = this.BasicDataParam3.filter(it => {

        return it.Title.toLowerCase().includes(fillter);

       
      });
    }
    if (ComboName === "Param4") {
      this.Param4Show = true;
      this.Param3Show = false;
      this.Param1Show = false;
      this.Param2Show = false;
      this.Param5Show = false;
      this.basicDataParam4 = this.BasicDataParam4.filter(it => {

        return it.Title.toLowerCase().includes(fillter);

       
      });
    }
    if (ComboName === "Param5") {
      this.Param5Show = true;
      this.Param4Show = false;
      this.Param3Show = false; 
      this.Param1Show = false;
      this.Param2Show = false;
      

      this.basicDataParam5 = this.BasicDataParam5.filter(it => {

        return it.Title.toLowerCase().includes(fillter);

       
      });
    }

  }
  private BaseDataFliterLoad(ComboName: string, Param: string, BasicDataALL: BasicData[],isshowEasySearch :boolean): BasicData[] {
    
    if(isshowEasySearch==true)
    {
      
      
      var Basic=this.BasicDataALL.filter(it => {

        return it.GroupTypeName_Fa.includes(ComboName);
      })

      for(let item of Basic)
      {
        item.CodeChar=Param;
        this.BasicDataParam6.push(item);

      }
      
      this.ShowEasySeachID=Param;
    }

    if (Param === "Param1") {

      this.BasicDataParam1 = this.BasicDataALL.filter(it => {

        return it.GroupTypeName_Fa.includes(ComboName);

        
      });
      return this.basicDataParam1;
    }
    else if (Param === "Param2") {

      this.BasicDataParam2 = this.BasicDataALL.filter(it => {

        return it.GroupTypeName_Fa.includes(ComboName);

       
      });
    }
    else if (Param === "Param3") {

      this.BasicDataParam3 = this.BasicDataALL.filter(it => {

        return it.GroupTypeName_Fa.includes(ComboName);

        
      });
      return this.basicDataParam3;
    }
    else if (Param === "Param4") {

      this.basicDataParam4 = this.BasicDataALL.filter(it => {

        return it.GroupTypeName_Fa.includes(ComboName);

        
      });
      return this.basicDataParam4;
    }
    else if (Param === "Param5") {

      this.BasicDataParam5 = this.BasicDataALL.filter(it => {

        return it.GroupTypeName_Fa.includes(ComboName);

        
      });
      return this.basicDataParam5;
    }
    else {
      return null;
    }

  }
  /** Only replace footer badge HTML when API returns a non-empty tag; keep hardcoded fallback. */
  private applyFooterBadge(elementId: string, tag: any) {
    const el = document.getElementById(elementId);
    if (!el) {
      return;
    }
    if (tag == null || tag === undefined) {
      return;
    }
    const html = tag.toString().trim();
    if (!html) {
      return;
    }
    el.innerHTML = html;
  }

  onSelectCompany(titleService: Title) {
    
    this.configService.FetchCompany_WesiteUrlGet(this.Lang, this.UserName, window.location.host).subscribe(data => {
      if (data.length > 0) {
        
        this.Company = data[0];
        this.them.CompanyID = data[0].ID.toString();
        this.them.CompanyName = data[0].Name.toString();
        ;
        this.them.BackgroundImageUrl=data[0].BackgroundUrl!=null?this.them.configUrlBasicImage+data[0].BackgroundUrl.toString():'~/assets/image/home.jpg';
        this.them.LogoUrl=data[0].LogoUrl!=null?this.them.configUrlBasicImage+data[0].LogoUrl.toString():'~/assets/image/logo.jpg';
        this.them.HeaderColor = '#2a261f';
        this.them.ButtonColor = '#9a7c38';
        this.them.HeaderFontColor = '#f3eee4';
        this.them.ButtonFontColor = '#fff8ea';
        this.them.PriceColor = '#b89a54';
        this.them.PriceFontColor = '#fff8ea';
        document.getElementById('favicon').setAttribute("href", this.them.LogoUrl);

        this.applyFooterBadge('Namd1', data[0].NamadTag);
        this.applyFooterBadge('Namd2', data[0].LicenseTag1);
        this.applyFooterBadge('Namd3', data[0].LicenseTag2);

        
        //--------------------عنوان صفحه مشخص شود---------------------------
        titleService.setTitle(this.them.CompanyName);
        
      }
   

    });
    //----------------گروه محصولات هر شرکت
    this.GetProducGroup();
  //-----------------صفحه جدید---------
  
  this.configService.Fetch_FilterPageMenuActive().subscribe(data => {
    
    this.MenuView= data
  });
  //---------------هدر سایت------------
  this.onPageGroupSelect(5);
  //---------------فوتر سایت-----------
  this.onPageGroupSelect(4);
  }
  //   <option value="0">صفحه جدید</option>
   //   <option value="1">صفحه اصلی</option>
   //   <option value="2">صفحه نتیجه جستجو</option>
   //   <option value="3">صفحه سبد خرید</option>
   //   <option value="4">داخل فوتر سایت</option>
			//<option value="5">داخل هدر سایت</option>
   //   <option value="6">صفجه خرید های من</option>
   //   <option value="7">داخل تصویر جستجو صفحه اصلی</option>
  onPageGroupSelect(PageLocationID: Number){
    this.configService.Fetch_FilterPageGeneratorGet(this.Lang, this.UserName, this.them.CompanyID, null, null, PageLocationID.toString(),'true')
      .subscribe(data => {
      
        
        if(PageLocationID==0)
        {
          this.PageGenerator_0 = data.filter(a => a.PageLocationID == PageLocationID);
          
        }
        if(PageLocationID==1)
        {
          this.PageGenerator_1 = data.filter(a => a.PageLocationID == PageLocationID);
          if (this.PageGenerator_1.length > 0)
            document.getElementById('PageGenerator_1').innerHTML = this.PageGenerator_1[0].PageContent;
        }
        if(PageLocationID==2)
        {
          this.PageGenerator_2 = data.filter(a => a.PageLocationID == PageLocationID);
          if (this.PageGenerator_2.length > 0)
            document.getElementById('PageGenerator_2').innerHTML = this.PageGenerator_2[0].PageContent;
        }
        if(PageLocationID==3)
        {
          this.PageGenerator_3 = data.filter(a => a.PageLocationID == PageLocationID);
          if (this.PageGenerator_3.length > 0)
            document.getElementById('PageGenerator_3').innerHTML = this.PageGenerator_3[0].PageContent;
        }
        if(PageLocationID==4)
        {
          this.PageGenerator_4 = data.filter(a => a.PageLocationID == PageLocationID);
          if (this.PageGenerator_4.length > 0)
            document.getElementById('PageGenerator_4').innerHTML = this.PageGenerator_4[0].PageContent;
        }
        if(PageLocationID==5)
        {
          this.PageGenerator_5 = data.filter(a => a.PageLocationID == PageLocationID);
          if (this.PageGenerator_5.length > 0)
            document.getElementById('PageGenerator_5').innerHTML = this.PageGenerator_5[0].PageContent;
        }
        if(PageLocationID==6)
        {
          this.PageGenerator_6 = data.filter(a => a.PageLocationID == PageLocationID);
          if (this.PageGenerator_6.length > 0)
            document.getElementById('PageGenerator_6').innerHTML = this.PageGenerator_6[0].PageContent;
        }
        if (PageLocationID == 7) {
          this.PageGenerator_7 = data.filter(a => a.PageLocationID == PageLocationID);
          if (this.PageGenerator_7.length > 0) {
            document.getElementById('PageGenerator_7').innerHTML = this.PageGenerator_7[0].PageContent;
          }
          else {
            document.getElementById('PageGenerator_7').style.display = 'none';
          }
          
            
        }
      });
  }
  PageInfo: String = '';
  PageHeader: String = '';
  onPageSelect(ID: string): String {
    this.configService.Fetch_FilterPageGeneratorID(this.Lang, this.UserName, ID).subscribe(data => {
      ;
      this.PageGenerator = data;
      this.PageInfo = this.PageGenerator[0].PageContent;
      this.PageHeader = this.PageGenerator[0].PageTitle;
      document.getElementById('PageNew').innerHTML = this.PageGenerator[0].PageContent;

      //--------------------عنوان صفحه مشخص شود---------------------------
      this.titleService.setTitle(this.them.CompanyName + "-" + this.PageHeader);

      return this.PageGenerator[0].PageContent
      

    });
    return '';
  }

//----------------گروه محصولات هر شرکت
GetProducGroup(){
  this.configService.Fetch_FilterCompanyProductGroupGet(this.them.CompanyID, this.Lang)
  .subscribe(data => {
    this.CompanyProductGroup = data.filter(a=>a.CountProduct>0);
    if (data.length > 0) {
      this.them.ProductGroupNameForFirst = data[0].Title;
      this.them.ProductGroupForFirst = data[0].ID.toString();
    }
   
  });
  
}

  InsertProductUserComment(params: any) {


    let result: any;
    this.configService.InsertProductUserComment(params).subscribe(data => {

      result = data;
      console.log('Update : ' + result);

      if (result === '0') {

        this.them.SeupAlert(null, 'alert-Info');
        this.them.ShowAlert('alert-Info');
      }
      else {

        if (this.Lang == 'fa') {
          this.them.AlertLis.Title = 'خطا';
          this.them.AlertLis.Body = result;
          this.them.SeupAlert(this.them.AlertLis, 'alert-warning');
        }
        else {
          this.them.AlertLis.Title = 'Error';
          this.them.AlertLis.Body = result;
          this.them.SeupAlert(this.them.AlertLis, 'alert-warning');
        }

        this.them.ShowAlert('alert-warning');
      }


    });
  }
  SelectProductComment(ProductID :string) {
    this.configService.Fetch_FilterProductUserCommentGet(this.Lang, '', '', ProductID, this.them.CompanyID, 'true').subscribe(data => {
      this.ProductUserComment = data;

    });
  }
  public  RouterProductDetail(id: string,type:string,IsHomePage:boolean) :string {
    
    if(IsHomePage){
     var testDiv = document.getElementById(type+id);
     this.them.ScrollY=testDiv.offsetTop;
     
      //this.router.navigate(['/p/' + id + '/home']);
      return '/p/' + id + '/home'
    }
    else{
     this.them.ScrollY=window.scrollY;
      //this.router.navigate(['/p/' + id]);
      return '/p/' + id
    }
    

   }
   public SearchSameProduct(ProductID: string) {
    this.configService.FetchProductSelect_SameProduc(this.Lang, '', ProductID, this.them.CompanyID).subscribe(data => {
      this.ProductSearch=data;
    })
    
    
  }

  public Total:Number;
  public TotalDiscount: Number;
  async onSelectProductOrder(ProductID: Number) {
    this.them.loading = true;
   await this.configService.Fetch_FilterProductID(this.Lang, this.UserName, ProductID.toString()).subscribe(data => {
     console.log('onSelectProductOrder 2: ', data);
     let basket = JSON.parse(localStorage.getItem('basket'));
     if (basket != null) {

       for (let i = 0; i < basket.OrderDetails.length; i++) {
         if (basket.OrderDetails[i].ProductID == ProductID) {
           Swal.fire({
             title: 'خطا!',
             text: 'این محصول قبلا به سفارشات شما اضافه شده است.',
             icon: 'error',
             confirmButtonText: 'تایید',
             confirmButtonColor: this.them.ButtonColor,
           })
           return;
         }
         this.Order.OrderDetails.push(basket.OrderDetails[i]);
       }

       localStorage.clear();
     }

      
      let OrderDetail = {
        ProductID: data[0].ID,
        ProducName: data[0].Name,
        ShoppingCount: 1,
        AvalaibleCount: Number(data[0].AvailableCount),
        UnitPrice: data[0].PriceSales,
        TotalPrice: Number(data[0].PriceSales),
        TotalDiscount: Number(data[0].DiscountPrice) ,
        Total: Number(data[0].PriceSales) - Number(data[0].DiscountPrice),
        OrderID: null,
        CompanyID: this.them.CompanyID

      }

      //const sum = this.productservice.Order.OrderDetails.reduce((sum, current) => sum + Number(current.UnitPrice) * Number(current.ShoppingCount), 0);
     
      if (OrderDetail.AvalaibleCount >= OrderDetail.ShoppingCount) {

        

        this.Order.OrderDetails.push(OrderDetail);
        this.Order.Total = this.Order.OrderDetails.reduce((sum, current) => sum + Number(current.UnitPrice) * Number(current.ShoppingCount), 0);
        this.Order.TotalDiscount = this.Order.OrderDetails.reduce((sum, current) => sum + Number(current.TotalDiscount), 0);
        this.Order.Total = Number(this.Order.Total) - Number(this.Order.TotalDiscount)
        this.them.loading = false;
        
        
        localStorage.setItem("basket", JSON.stringify(this.Order));
        //-------------------------------
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
        //----------------------------
       
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




}
