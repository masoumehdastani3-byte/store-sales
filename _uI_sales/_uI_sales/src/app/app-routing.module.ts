import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomePageComponent } from './content/home-page/home-page.component';
import { ContentComponent } from './content/content.component';
import { SearchResultComponent } from './content/search-result/search-result.component';
import { ConfirmBankPWGComponent } from './content/confirm-bank-pwg/confirm-bank-pwg.component';

//--------------------------login----------------------------

import { AuthGuard } from "./shared/auth.guard";
import { NotFoundComponent } from './shared/not-found/not-found.component';
//---------------------------------------------------------

import { ContractShoppingComponent } from './content/contract-shopping/contract-shopping.component';
import { MyPurchasesComponent } from './content/my-purchases/my-purchases.component';
import { PagesComponent } from './content/pages/pages.component';
import { ProductDetailsComponent } from './content/product-details/product-details.component';
import { BasketComponent } from './content/basket/basket.component';

const routes: Routes = [


  {
    path: '', component: ContentComponent,
    children: [
      { path: 'about-us', component: AboutUsComponent },
      { path: 'search-result/:ProductGroup/:basket/:ProductGroupName', component: SearchResultComponent },
      { path: 'search-result', component: SearchResultComponent },
      { path: 'home-page', component: HomePageComponent },
      { path: 'shopping-contract', component: ContractShoppingComponent },
      { path: 'my-purchases', component: MyPurchasesComponent },
      { path: 'page', component: PagesComponent },
      { path: 'page/:id', component: PagesComponent },
      { path: 'p/:id', component: ProductDetailsComponent },
      { path: 'p/:id/:page', component: ProductDetailsComponent },
      { path: 'p/:id/:page/:y', component: ProductDetailsComponent },
      { path: 'confirm-PWG', component: ConfirmBankPWGComponent },
      { path: 'basket', component: BasketComponent },
      
    ],
  },
  { path: '404', component: NotFoundComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


