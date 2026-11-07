
import { PageMenu } from '../../shared/modules/PageMenu.module';

import { ProductUserComment } from '../../shared/modules/ProductUserComment.module';
import { VisitedHistory } from '../../shared/modules/VisitedHistory.module';

import { PageGenerator } from '../../shared/modules/PageGenerator.module';
import { CompanyProductGroup } from '../../shared/modules/CompanyProductGroup.module';
import { Purchase } from '../../shared/modules/Purchase.module';
import { Customer } from '../../shared/modules/Customer.module';
import { OrderDetails } from '../../shared/modules/Order.module';
import { ProductImage } from '../../shared/modules/ProductImage.module';

import { ProductGroupDetail } from '../../shared/modules/ProductGroupDetail.module';
import { ProductGroup } from '../../shared/modules/ProductGroup.module';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BasicData } from '../../shared/modules/BasicData.module';
import { Product } from '../../shared/modules/product.module';
import { ParamShowSearch } from '../../shared/modules/ParamShowSearch.module';
import { Company } from '../../shared/modules/Company.module';
import { User } from '../../shared/modules/User';
import { UserRole } from '../../shared/modules/UserRole.module';
import { Router } from '@angular/router';
import { them } from '../service/themplate.service';
import { DenyMenu } from '../../shared/modules/UserAccess.module';
import { Menu } from '../../shared/modules/UserAccess.module';
import { ProductDetailSpecification } from '../modules/Product.module';
import { Order } from '../modules/Order.module';
import { Paggin } from '../../shared/modules/Product.module';
import { CompanySettings } from '../../shared/modules/CompanySettings.module';
import { MenuView } from '../../shared/modules/PageMenu.module';
import { PaymentRequestResponseModel } from '../../shared/modules/Order.module';
@Injectable()
export class ConfigService {
  configUrlBasic = this.them.configUrlBasic;
  public loading = false;
  configUrl: string = "";
  constructor(private http: HttpClient, public router: Router, public them: them) { }
  //*****************FileUploader************************
  FileUploader(formData: any) {
    this.configUrl = this.configUrlBasic + '/Uploader/Post'
    return this.http.post<String>(this.configUrl, formData).pipe(
      catchError(this.handleError)
    );
  }
  FetchBasicDate(Lang: string, GroupType: string) {
    this.configUrl = this.configUrlBasic + '/BasicData/'
    return this.http.get<BasicData[]>(this.configUrl, {
      params: {
        Lang: Lang,
        GroupType: GroupType,

      }
    }).pipe(
      catchError(this.handleError)
    );



  }


  FetchParamShowSearch(Lang: string, ProductGroupID: string, WebSite: string) {
    this.configUrl = this.configUrlBasic + '/ParamShowSearch/'
    //نمایش صفحه لیست محصولات
    if (WebSite == null || WebSite == '') {
      return this.http.get<ParamShowSearch[]>(this.configUrl, {
        params: {
          Lang: Lang,
          UserName: '',
          IP: '',
          ProductGroupID: ProductGroupID,
          IsShowSearch: 'true',

        }
      }).pipe(
        catchError(this.handleError)
      );
    }  //-------------------نمایش صفحه اول سایت
    else {
      return this.http.get<ParamShowSearch[]>(this.configUrl, {
        params: {
          Lang: Lang,
          UserName: '',
          IP: '',
          WebSite: WebSite
        }
      }).pipe(
        catchError(this.handleError)
      );
    }




  }
  FetchProductDatail(Lang: string, UserName: string, ProductGroupID: string) {
    this.configUrl = this.configUrlBasic + '/ParamShowSearch/'
    return this.http.get<ParamShowSearch[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        IP: '',
        ProductGroupID: ProductGroupID,
        IsShowSearch: null,
      }
    }).pipe(
      catchError(this.handleError)
    );

  }
  FetchProductSelect(Lang: string, loguser: string, logIP: string, isSpecialSales: string, productGroupID: string, productID: string, companyID: string, stringParamGroupType: string, stringParamGroupName: string, IsNewCreate: string,
    PageNumber: string, OrderByColumn: string, OrderDirection: string) {


    this.configUrl = this.configUrlBasic + '/ProductSelect/'
    return this.http.get<Product[]>(this.configUrl, {
      params: {
        Lang: Lang,
        loguser: loguser,
        isSpecialSales: isSpecialSales,
        productGroupID: productGroupID,
        productID: productID,
        companyID: companyID,
        stringParamGroupType: stringParamGroupType,
        stringParamGroupName: stringParamGroupName,
        IsNewCreate: IsNewCreate,
        PageNumber: PageNumber,
        OrderByColumn: OrderByColumn,
        OrderDirection: OrderDirection

      }

    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchProductSelect_SameProduc(Lang: string, loguser: string, productID: string, companyID: string) { 
    


    this.configUrl = this.configUrlBasic + '/ProductSameSelect/'
    return this.http.get<Product[]>(this.configUrl, {
      params: {
        Lang: Lang,
        loguser: loguser,
        productID: productID,
        // companyID: companyID,
       

      }

    }).pipe(
      catchError(this.handleError)
    );
  }

  //BaseData**********************************************************************
  FetchBaseData_GroupType(Lang: string, UserName: string, GroupType: string, CodeChar: string) {
    this.configUrl = this.configUrlBasic + '/BaseData/'
    return this.http.get<BasicData[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        GroupType: GroupType,
        CodeChar: CodeChar

      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchBaseData_ID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/BaseData/'
    return this.http.get<BasicData[]>(this.configUrl, {
      params: {
        ID: ID


      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchBaseData_GroupSelect(Lang: string, UserName: string, CodeChar: string) {
    this.configUrl = this.configUrlBasic + '/GroupSelectBaseTable/'
    return this.http.get<BasicData[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        CodeChar: CodeChar
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  FetchProductSpecificationSelect(Lang: string, UserName: string, GroupType: string, GroupTypeName: string,CompanyID:string) {
    this.configUrl = this.configUrlBasic + '/ProductSpecification/'
    return this.http.get<BasicData[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        GroupType: GroupType,
        GroupTypeName: GroupTypeName,
        companyID:CompanyID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  //Company***********************************************************************
  FetchCompany_Filter(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectCompany/Get'
    return this.http.get<Company[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchCompany_FilterID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectCompany/Get'
    return this.http.get<Company>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: '',
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchCompany_FilterGet(Lang: string, CompanyName: string, UserName: string, CountryID_BasicData: string, CityID_BasicData: string, CompanyGroupID_BaseData: string, WesiteUrl: string) {
    this.configUrl = this.configUrlBasic + '/SelectCompany/Get'

    return this.http.get<Company[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        CompanyName: CompanyName,
        CountryID_BasicData: CountryID_BasicData.toString(),
        CityID_BasicData: CityID_BasicData.toString(),
        CompanyGroupID_BaseData: CompanyGroupID_BaseData

      }

    }).pipe(
      catchError(this.handleError)
    );

  }
  FetchCompany_WesiteUrlGet(Lang: string, UserName: string, WesiteUrl: string) {
    this.configUrl = this.configUrlBasic + '/SelectCompanyWebsiteUrl/Get'

    return this.http.get<Company[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        WesiteUrl: WesiteUrl
      }

    }).pipe(
      catchError(this.handleError)
    );

  }
  //-----------------------------------------------------
  DeleteCompany_ID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeleteCompany/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  InsertCompany(params: any) {

    this.configUrl = this.configUrlBasic + '/InsertCompany/Get'


    return this.http.get(this.configUrl, { params }


    ).pipe(
      catchError(this.handleError)
    );
  }
  UpdateCompany(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateCompany/Get'

    return this.http.get(this.configUrl, { params }

    ).pipe(
      catchError(this.handleError)
    );
  }


  //UserProfile*********************************************************************
  FetchUserProfile_Filter(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/UserProfile/Get'

    return this.http.get<User[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }

    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchUserProfile_FilterID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/UserProfile/Get'

    return this.http.get<User[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }

    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchUserProfile_FilterDefaultCompany(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/UserProfile/Get'

    return this.http.get<User[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        isDefault: 'true'
      }

    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterUserProfileGet(Lang: string, UserName: string, UserID: string, Name: string, Family: string, CompanyID: string, RoleID: string, Mobile: string, TokenID: string, Email: string, NationalCode: string) {
    this.configUrl = this.configUrlBasic + '/UserProfile/Get'

    return this.http.get<User[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        UserID: UserID,
        Name: Name,
        Family: Family,
        CompanyID: CompanyID,
        RoleID: RoleID,
        Mobile: Mobile,
        TokenID: TokenID,
        Email: Email,
        NationalCode: NationalCode

      }

    }).pipe(
      catchError(this.handleError)
    );

  }
  //-------------------------------------------------
  //------------------------------------------------
  DeleteUserProfile_ID(ID: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/DeleteUserProfile/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  InserUserProfile(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertUserProfile/Get'

    return this.http.get(this.configUrl, { params }

    ).pipe(
      catchError(this.handleError)
    );
  }
  UpdateUserProfile(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateUserProfile/Get'
    return this.http.get(this.configUrl, { params }

    ).pipe(
      catchError(this.handleError)
    );
  }
  //UserProfile*********************************************************************
  FetchUserRole_Filter(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectUserRole/Get'

    return this.http.get<UserRole[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }

    }).pipe(
      catchError(this.handleError)
    );
  }
  FetchUserRole_FilterID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectUserRole/Get'

    return this.http.get<UserRole[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }

    }).pipe(
      catchError(this.handleError)
    );
  }
  //string Lang, string UserName, string RoleName, bool Active, int ? ParentLangID
  Fetch_FilterUserRoleGet(Lang: string, UserName: string, RoleName: string) {
    this.configUrl = this.configUrlBasic + '/SelectUserRole/Get'

    return this.http.get<UserRole[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        RoleName: RoleName
      }

    }).pipe(
      catchError(this.handleError)
    );

  }
  //-------------------------------------------------

  DeleteUserRole_ID(ID: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/DeleteUserRole/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  InserUserRole(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertUserRole/Get'

    return this.http.get(this.configUrl, { params }

    ).pipe(
      catchError(this.handleError)
    );
  }
  UpdateUserRole(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateUserRole/Get'
    return this.http.get(this.configUrl, { params }

    ).pipe(
      catchError(this.handleError)
    );
  }
  //Settings************************************************************************
  InsertSettings(Name: string, UserName: string, Group: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/InsertBaseData/Get'

    return this.http.get(this.configUrl, {
      params: {
        Name: Name,
        UserName: UserName,
        Group: Group,
        Lang: Lang
      }
    }

    ).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error

      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  //UserAccess**********************************************************************
  //---------------------------------UserSubMenu----------------------------------

  Fetch_FilterUserSubMenuGet(Lang: string, UserName: string, Title: string, ControlID: string, Active: string, IsShow: string) {
    this.configUrl = this.configUrlBasic + '/SelectUserSubMenu/Get'

    return this.http.get<Menu[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        Title: Title,
        ControlID: ControlID,
        Active: Active,
        IsShow: IsShow
      }

    }).pipe(
      catchError(this.handleError)
    );

  }
  //---------------------------------UserMenu------------------------------------

  Fetch_FilterUserMenuGet(Lang: string, UserName: string, Title: string, Active: string, IsShow: string) {
    this.configUrl = this.configUrlBasic + '/SelectUserMenu/Get'

    return this.http.get<Menu[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        Title: Title,
        Active: Active,
        IsShow: IsShow

      }

    }).pipe(
      catchError(this.handleError)
    );

  }
  //--------------------------------UserNotAcessMenu----------------------------

  Fetch_FilterUserNotAcessMenuGet(Lang: string, UserName: string, RoleID: string, Title: string, ControlID: string, Active: string, IsShow: string) {
    this.configUrl = this.configUrlBasic + '/SelectUserNotAcessMenu/Get'
      ;
    return this.http.get<Menu[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        Title: Title,
        ControlID: ControlID,
        Active: Active,
        IsShow: IsShow,
        RoleID: RoleID
      }

    }).pipe(
      catchError(this.handleError)
    );

  }
  //---------------------------------UserAcessMenu-----------------------------------
  Fetch_FilterUserAcessMenuGet(Lang: string, UserName: string, RoleID: string, Title: string, ControlID: string, Active: string, IsShow: string) {
    this.configUrl = this.configUrlBasic + '/SelectUserAccessMenu/Get'

    return this.http.get<Menu[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        Title: Title,
        ControlID: ControlID,
        Active: Active,
        IsShow: IsShow,
        RoleID: RoleID

      }

    }).pipe(
      catchError(this.handleError)
    );

  }

  DeleteUserAcess_ID(ID: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/DeleteUserAccess/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  InserUserAcess(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertUserAccess/Get'

    return this.http.get(this.configUrl, { params }

    ).pipe(
      catchError(this.handleError)
    );

  }


  //--8:04:18 AM Friday, June 19, 2020
  //ProductGroup*********************************************************************

  Fetch_FilterProductGroupGet(UserName: string, Lang: string, ID: string, ParentID: string, Title: string, ParentTitle: string, IsLastChid: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductGroup/Get'
    return this.http.get<ProductGroup[]>(this.configUrl, {
      params: {
        UserName: UserName,
        ID: ID,
        Lang: Lang,
        ParentID: ParentID,
        Title: Title,
        ParentTitle: ParentTitle,
        IsLastChid: IsLastChid
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProductGroup(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductGroup/Get'
    return this.http.get<ProductGroup[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProductGroupID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductGroup/Get'
    return this.http.get<ProductGroup>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //--8:04:30 AM Friday, June 19, 2020
  //ProductGroup*********************************************************************
  //InsertProductGroup---------------------------------------------------------------

  InsertProductGroup(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertProductGroup/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //UpdateProductGroup---------------------------------------------------------------
  UpdateProductGroup(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateProductGroup/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }

  //DeleteProductGroup---------------------------------------------------------------
  DeleteProductGroupID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeleteProductGroup/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }


  //--8:05:56 AM Friday, June 19, 2020
  //ProductGroupDetail*********************************************************************

  Fetch_FilterProductGroupDetailGet(UserName: string, Lang: string, ID: string, ProductGroupID: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductGroupDetail/Get'
    return this.http.get<ProductGroupDetail[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID,
        ProductGroupID: ProductGroupID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProductGroupDetail(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductGroupDetail/Get'
    return this.http.get<ProductGroupDetail[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProductGroupDetailID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductGroupDetail/Get'
    return this.http.get<ProductGroupDetail>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_SelectProductGroupDetailGroupBy(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductGroupDetailGroupBy/Get'
    return this.http.get<ProductGroupDetail[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,

      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //--8:06:01 AM Friday, June 19, 2020
  //ProductGroupDetail*********************************************************************
  //InsertProductGroupDetail---------------------------------------------------------------
  InsertProductGroupDetail(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertProductGroupDetail/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //UpdateProductGroupDetail---------------------------------------------------------------
  UpdateProductGroupDetail(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateProductGroupDetail/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //DeleteProductGroupDetail---------------------------------------------------------------
  DeleteProductGroupDetailID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeleteProductGroupDetail/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }


  //--8:07:34 AM Friday, June 19, 2020
  //Product*********************************************************************

  Fetch_FilterProductGet(UserName: string, Lang: string, ID: string, CompanyID: string, ProductGroupID: string, BarCode: string, Name: string) {
    this.configUrl = this.configUrlBasic + '/SelectProduct/Get'
    return this.http.get<Product[]>(this.configUrl, {
      params: {
        UserName: UserName,
        Lang: Lang,
        BarCode: BarCode,
        CompanyID: CompanyID,
        ID: ID,
        Name: Name,
        ProductGroupID: ProductGroupID

      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProduct(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectProduct/Get'
    return this.http.get<Product[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProductID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectProduct/Get'
    return this.http.get<Product>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //--8:07:37 AM Friday, June 19, 2020
  //Product*********************************************************************
  //InsertProduct---------------------------------------------------------------
  InsertProduct(PostData: any) {
    this.configUrl = this.configUrlBasic + '/InsertProduct/Post'
    return this.http.post<any[]>(this.configUrl, {
      PostData
    }

    ).pipe(
      catchError(this.handleError)
    );
  }
  //UpdateProduct---------------------------------------------------------------
  UpdateProduct(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateProduct/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //DeleteProduct---------------------------------------------------------------
  DeleteProductID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeleteProduct/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }


  //--6:08:14 AM Friday, September 25, 2020
  //ProductImage*********************************************************************
  Fetch_FilterProductImageGet(Lang: string, UserName: string, ProductID: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductImage/Get'
    return this.http.get<ProductImage[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ProductID: ProductID,
        ID: ID,
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProductImage(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductImage/Get'
    return this.http.get<ProductImage[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterProductImageID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductImage/Get'
    return this.http.get<ProductImage>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //--6:08:19 AM Friday, September 25, 2020
  //ProductImage*********************************************************************
  //InsertProductImage---------------------------------------------------------------
  InsertProductImage(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertProductImage/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //UpdateProductImage---------------------------------------------------------------
  UpdateProductImage(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateProductImage/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //DeleteProductImage---------------------------------------------------------------
  DeleteProductImageID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeleteProductImage/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //-------------------------------------------------------
  Fetch_FilterProductDetail_SpecificationGet(Lang: string, UserName: string, ProductID: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductDetail_Specification/Get'
    return this.http.get<ProductDetailSpecification[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ProductID: ProductID,

      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //--8:19:19 AM Friday, December 11, 2020
  //Customer*********************************************************************
  Fetch_FilterCustomerGet(Lang: string, UserName: string, ID: string, CompanyID: string, Mobile: string, Email: string, FullName: string, CodeMelli:string) {
    this.configUrl = this.configUrlBasic + '/SelectCustomer/Get'
    return this.http.get<Customer[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        CompanyID: CompanyID,
        Email: Email,
        FullName: FullName,
        ID: ID,
        Mobile: Mobile,
        CodeMelli:CodeMelli
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterCustomer(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectCustomer/Get'
    return this.http.get<Customer[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterCustomerID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectCustomer/Get'
    return this.http.get<Customer>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  //InsertOrder---------------------------------------------------------------
  InsertOrder(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertOrder/post'
    return this.http.post<PaymentRequestResponseModel>(this.configUrl, params
    ).pipe(
      catchError(this.handleError)
    );
  }

  //--7:08:10 AM Thursday, January 14, 2021
  //Purchase*********************************************************************

  Fetch_FilterPurchaseGet(Lang: string, UserName: string, ID: string, CompanyID: string, CustomerID: string, FromDate: string, ToDate: string, FullName: string, Status: string) {
    this.configUrl = this.configUrlBasic + '/SelectPurchase/Get'
    return this.http.get<Purchase[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID,
        CompanyID: CompanyID,
        CustomerID: CustomerID,
        FromDate: FromDate,
        ToDate: ToDate,
        FullName: FullName,
        Status: Status


      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPurchase(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectPurchase/Get'
    return this.http.get<Purchase[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPurchaseID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectPurchase/Get'
    return this.http.get<Purchase>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  UpdatePurchase(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdatePurchase/Get'

    return this.http.get(this.configUrl, { params }

    ).pipe(
      catchError(this.handleError)
    );
  }

  //--11:55:12 AM Monday, February 15, 2021
  //CompanyProductGroup*********************************************************************
  Fetch_FilterCompanyProductGroupGet(CompanyID: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/SelectCompanyProductGroup/Get'
    return this.http.get<CompanyProductGroup[]>(this.configUrl, {
      params: {
        CompanyID: CompanyID,
        Lang: Lang,

      }
    }).pipe(
      catchError(this.handleError)
    );
  }


  //------------------Social Networks-------------
  SendTelegram(CompanyID: string) {
    this.configUrl = this.configUrlBasic + '/Telegram/Get'
    return this.http.get(this.configUrl, {
      params: {
        CompanyID: CompanyID

      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  SendInstagram(CompanyID: string) {
    this.configUrl = this.configUrlBasic + '/Instagram/Get'
    return this.http.get(this.configUrl, {
      params: {
        CompanyID: CompanyID

      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  GetTelegramUserChatID(CompanyID: string) {
    this.configUrl = this.configUrlBasic + '/TelegramUserChatID/Get'
    return this.http.get(this.configUrl, {
      params: {
        CompanyID: CompanyID

      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  GetTelegramGroupChatID(CompanyID: string) {
    this.configUrl = this.configUrlBasic + '/TelegramGroupChatID/Get'
    return this.http.get(this.configUrl, {
      params: {
        CompanyID: CompanyID

      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  //--8:51:44 PM Monday, March 1, 2021
  //PageGenerator*********************************************************************
  Fetch_FilterPageGeneratorGet(Lang: string, LogUser: string, CompanyID: string, ID: string, PageContent: string, PageLocationID: string, Active: string) {
    this.configUrl = this.configUrlBasic + '/SelectPageGenerator/Get'
    return this.http.get<PageGenerator[]>(this.configUrl, {
      params: {
        Lang: Lang,
        LogUser: LogUser,
        CompanyID: CompanyID,
        ID: ID,
        PageContent: PageContent,
        PageLocationID: PageLocationID,
        Active: Active
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPageGenerator(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectPageGenerator/Get'
    return this.http.get<PageGenerator[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPageGeneratorID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectPageGenerator/Get'
    return this.http.get<PageGenerator>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPageGeneratorCompanyID(Lang: string, UserName: string, CompanyID: string) {
    this.configUrl = this.configUrlBasic + '/SelectPageGenerator/Get'
    return this.http.get<PageGenerator[]>(this.configUrl, {
      params: {

        CompanyID: CompanyID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //--10:22:41 PM Monday, March 1, 2021
  //PageGenerator*********************************************************************
  //InsertPageGenerator---------------------------------------------------------------
  InsertPageGenerator(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertPageGenerator/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //UpdatePageGenerator---------------------------------------------------------------
  UpdatePageGenerator(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdatePageGenerator/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //DeletePageGenerator---------------------------------------------------------------
  DeletePageGeneratorID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeletePageGenerator/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }


  //-------------------------------
  Fetch_FilterPageCount(CompanyID: string, ProductGroupID: string) {
    this.configUrl = this.configUrlBasic + '/PageCount/Get'
    return this.http.get<Paggin[]>(this.configUrl, {
      params: {

        CompanyID: CompanyID,
        ProductGroupID: ProductGroupID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  //--10:34:07 PM Monday, March 22, 2021
  //VisitedHistory*********************************************************************
  Fetch_FilterVisitedHistoryGet(CompanyID: string, durationDay: string) {
    this.configUrl = this.configUrlBasic + '/VisitedHistory/Get'
    return this.http.get<VisitedHistory[]>(this.configUrl, {
      params: {

        CompanyID: CompanyID,
        durationDay: durationDay
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterVisitedHistory(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/VisitedHistory/Get'
    return this.http.get<VisitedHistory[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterVisitedHistoryID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/VisitedHistory/Get'
    return this.http.get<VisitedHistory>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //--11:12:04 PM Thursday, April 1, 2021
  //ProductUserComment*********************************************************************
  Fetch_FilterProductUserCommentGet(Lang: string, Loguser: string, LogIP: string, ProductID: string, CompanyID: string, Active: string) {
    this.configUrl = this.configUrlBasic + '/SelectProductUserComment/Get'
    return this.http.get<ProductUserComment[]>(this.configUrl, {
      params: {
        Lang: Lang,
        Loguser: Loguser,
        LogIP: LogIP,
        ProductID: ProductID,
        CompanyID: CompanyID,
        Active: Active,
      }
    }).pipe(
      catchError(this.handleError)
    );
  }


  //--11:13:02 PM Thursday, April 1, 2021
  //ProductUserComment*********************************************************************
  //InsertProductUserComment---------------------------------------------------------------
  InsertProductUserComment(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertProductUserComment/Post'
    return this.http.post(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //UpdateProductUserComment---------------------------------------------------------------
  UpdateProductUserComment(params: any) {
    this.configUrl = this.configUrlBasic + '/UpdateProductUserComment/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //DeleteProductUserComment---------------------------------------------------------------
  DeleteProductUserCommentID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeleteProductUserComment/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  //--------------------RestaurantSetting----------------------------------
  FetchCompanySetting(Lang: string, UserName: string, CompanyID: string, Category: string) {
    this.configUrl = this.configUrlBasic + '/SelectRestaurantSetting/'
    return this.http.get<CompanySettings[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        CompanyID: CompanyID,
        Category: Category

      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  InsertCompanySetting(Postdata: any) {
    this.configUrl = this.configUrlBasic + '/InsertRestauranSetting/post'
    return this.http.post(this.configUrl, { Postdata }
    ).pipe(
      catchError(this.handleError)
    );
  }


  //--1:25:53 PM Tuesday, April 6, 2021
  //PageMenu*********************************************************************
  Fetch_FilterPageMenuGet(Lang: string, UserName: string, CompanyID: string) {
    this.configUrl = this.configUrlBasic + '/SelectPageMenu/Get'
    return this.http.get<PageMenu[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        CompanyID: CompanyID,
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPageMenu(Lang: string, UserName: string) {
    this.configUrl = this.configUrlBasic + '/SelectPageMenu/Get'
    return this.http.get<PageMenu[]>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPageMenuID(Lang: string, UserName: string, ID: string) {
    this.configUrl = this.configUrlBasic + '/SelectPageMenu/Get'
    return this.http.get<PageMenu>(this.configUrl, {
      params: {
        Lang: Lang,
        UserName: UserName,
        ID: ID
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  Fetch_FilterPageMenuActive() {
    this.configUrl = this.configUrlBasic + '/SelectMenuPageActive/Get'
    return this.http.get<MenuView[]>(this.configUrl).pipe(
      catchError(this.handleError)
    );
  }
  //--1:26:19 PM Tuesday, April 6, 2021
  //PageMenu*********************************************************************
  //InsertPageMenu---------------------------------------------------------------
  InsertPageMenu(params: any) {
    this.configUrl = this.configUrlBasic + '/InsertPageMenu/Get'
    return this.http.get(this.configUrl, { params }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //UpdatePageMenu---------------------------------------------------------------
  UpdatePageMenu(Postdata: any) {
    this.configUrl = this.configUrlBasic + '/UpdatePageMenu/Post'
    return this.http.post(this.configUrl, { Postdata }
    ).pipe(
      catchError(this.handleError)
    );
  }
  //DeletePageMenu---------------------------------------------------------------
  DeletePageMenuID(ID: string, UserName: string, Lang: string) {
    this.configUrl = this.configUrlBasic + '/DeletePageMenu/Get'
    return this.http.get(this.configUrl, {
      params: {
        ID: ID,
        UserName: UserName,
        Lang: Lang
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
}

//-------------------------------
