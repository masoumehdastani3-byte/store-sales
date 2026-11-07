import { ProductImage } from '../../shared/modules/ProductImage.module'; 
import { BasicData } from './BasicData.module';
export interface Product {
  ID: number;  
  ParentID: number;
  CompanyID: number;
  Positive: number;
  Negative: number;
  PriceBuy: number;
  Image_Url: string;
  ImageDescription: string; //Image
  GroupTypeName: string;
  Title: string; //BasicData
  ProductGroup_Title: string;
  ProductDescription: string;
  PriceSales: number;
  DiscountPrice: number;
  IsAvailable: boolean;
  OffPercent: number;
  CurrencyCode: string;
  CourrencyName: string;
  checked: boolean;
  ProductGroupID: Number
  Currency: string;
  CreaeDate: string;
  UpdateDate: string; 
  LogUser: string
  Acive: boolean;
  AvailableCount: Number;
  SalesCount: Number;
  IsSpecialSales: boolean;
  IsOffPercent: boolean;
  FromDateSpecialSales_Mila: string;
  FromDateSpecialSales: string;
  ToDateSpecialSales_Mila: string;
  ToDateSpecialSales: string;
  BarCode: string;
  ImageUrl: string
  Name: string;
  SumerySpecification: string;
  IsViewInstagram: boolean;
  IsViewTelegram: boolean;
  InstagramTag: string;
  IsSendInstagram: boolean;
  IsSendTelegram: boolean;
  TelegramError: string;
  InstagramError: string;
  TelegramBotToken: string;
  DefaultImageVideo: string;
  Grad: Number;
  VisitedCount: Number;
  ProductDetails: ProductDetails[];
  ProductImage: ProductImage[];
  Comparison:boolean;
}

export interface ProductDetails {
  Title: string; //BasicData
  GroupTypeName: string;
}
export interface ProductInsert {
  ID: number; 
  CompanyID: number;  
  PriceBuy: number;  
  PriceSales: number;
  IsAvailable: boolean;
  OffPercent: number;   
  ProductGroupID: Number
  Currency: string; 
  LogUser: string
  Acive: boolean;
  IsOffPercent: boolean;
  AvailableCount: Number;
  SalesCount: Number;
  IsSpecialSales: boolean;
  FromDateSpecialSales: any; 
  ToDateSpecialSales: any;
  BarCode: string;
  ImageUrl: string
  Name: string;
  Description: string;
  Lang: string;
  IsViewInstagram: boolean;
  IsViewTelegram: boolean;
  InstagramTag: string;
 
    
}
export interface ProductDetailSpecification {
  ID: Number;
  ProductID: Number;
  ProductSpecificationID: Number;
  Title: string;
  GroupType: string;
  GroupTypeName: string;
}
export interface detail {
  ParamSearch: string;
  ParamName: string;
  Specification: string;
  ID: any;
  listDeatils: BasicData[];

}
export interface Paggin {
  pageNumber: Number;
  Active: boolean;
  LastPage: boolean;
  FirstPage: boolean;
}
