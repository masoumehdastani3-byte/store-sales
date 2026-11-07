
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { HomePageComponent } from './content/home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchResultComponent } from './content/search-result/search-result.component';

import { ImageGalleryComponent } from './content/image-gallery/image-gallery.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';//, HTTP_INTERCEPTORS  For login
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//-------------------------------------------------------------------
import { ConfigService } from './shared/service/api.service';
import { them } from './shared/service/themplate.service';
import { ProductService } from './shared/service/product.service';

//-----------------------------Translate--------------

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//-----------------------------------------------------
import { NgbdSortableHeader } from './shared/service/sortable.directive';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';


import { NotFoundComponent } from './shared/not-found/not-found.component';




import { ContractShoppingComponent } from './content/contract-shopping/contract-shopping.component';
import { MyPurchasesComponent } from './content/my-purchases/my-purchases.component';

import { PagesComponent } from './content/pages/pages.component';

import { ProductDetailsComponent } from './content/product-details/product-details.component';
import { ConfirmBankPWGComponent } from './content/confirm-bank-pwg/confirm-bank-pwg.component';
import { ProductListSmallComponent } from './content/product-list-small/product-list-small.component';
import { ProductListLargeComponent } from './content/product-list-large/product-list-large.component';
import { EasySearchComponent } from './content/easy-search/easy-search.component';
import { ImageViewerComponent } from './content/image-viewer/image-viewer.component';
import { BasketComponent } from './content/basket/basket.component';
import { ImgLoadDirective } from './shared/directives/img-load.directive';




export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    ContentComponent,
    AboutUsComponent,
    SearchResultComponent,
    ImageGalleryComponent,
    NgbdSortableHeader,
    AppComponent,
    NgbdSortableHeader,
    NotFoundComponent,
    ContractShoppingComponent,
    MyPurchasesComponent,
    PagesComponent,
    ProductDetailsComponent,
    ConfirmBankPWGComponent,
    ProductListSmallComponent,
    ProductListLargeComponent,
    EasySearchComponent,
    ImageViewerComponent,
    BasketComponent,
    ImgLoadDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),


  ],
  providers: [ConfigService, them, DecimalPipe, NgbdSortableHeader, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

