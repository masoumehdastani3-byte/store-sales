import { Injectable, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { ProductUserComment } from '../modules/ProductUserComment.module';
import { BasicData } from '../modules/BasicData.module';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { them } from './themplate.service';
import { SortDirection } from './sortable.directive';
import { ConfigService } from './api.service';
import { AuthService } from '../auth.service';
interface SearchResult {
  List: ProductUserComment[];


  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(List: ProductUserComment[], column: string, direction: string): ProductUserComment[] {
  if (direction === '') {
    return List;
  } else {
    return [...List].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


@Injectable({ providedIn: 'root' })
export class panelProductUserComment {

  //===========================================================================
  public ProductUserComment: ProductUserComment[] = [];
  public ProductUserCommentStatus: BasicData[];
  public Country: BasicData[];
  public ProductUserCommentGroup: BasicData[];

  public UserName: string = this.authService.getUserName();
  public Lang: string = localStorage.getItem('language');
  //===========================================================================
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _List$ = new BehaviorSubject<ProductUserComment[]>([]);//this.Select('', '', '', "", '', true)
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private configService: ConfigService, public authService: AuthService, private translate: TranslateService, public them: them) {


    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {

      this._List$.next(result.List);
      this._total$.next(result.total);
    });

    //this._search$.next();
  }

  public get List$() { return this._List$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let List = sort(this.ProductUserComment, sortColumn, sortDirection);

    //2. filter
    if (searchTerm != null && searchTerm != "") {



      List = List.filter(a =>
        (a.Active === null ? false : a.Active.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        || (a.CompanyID === null ? false : a.CompanyID.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        || (a.Name === null ? false : a.Name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        || (a.Description === null ? false : a.Description.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        || (a.FullName === null ? false : a.FullName.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        || (a.ID === null ? false : a.ID.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        || (a.ProductID === null ? false : a.ProductID.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        || (a.Date_Shamsi === null ? false : a.Date_Shamsi.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );

    }

    const total = List.length;

    // 3. paginate
    List = List.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

    return of({ List, total });
  }
  //*******************************************************************************************************************
  Select(Lang: string, Loguser: string, LogIP: string, ProductID: string, CompanyID: string, Active: string): ProductUserComment[] {
    this.configService.Fetch_FilterProductUserCommentGet(Lang, Loguser, LogIP, ProductID, CompanyID, Active).subscribe(data => {

      this.ProductUserComment = data;
      this._List$ = new BehaviorSubject<any>(this.ProductUserComment);

      this.page = this.them.Page;
      this.pageSize = this.them.PageSize;


      return this.ProductUserComment;

    });

    return this.ProductUserComment;

  }



  Update(params: any) {


    let result: any;
    this.configService.UpdateProductUserComment(params).subscribe(data => {

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
  Delete(UserName: string, ID: string) {
    let result: any;
    this.configService.DeleteUserProfile_ID(ID, UserName).subscribe(data => {
      result = data;
      console.log(result);
      if (result === '0') {
        document.getElementById('btn-Search').click();
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
  /**********************Data***Combo**********************************/
  //onProductUserCommentStatusGet(Lang: string) {
  //    this.configService.FetchBaseData_GroupType(Lang,this.UserName, 'ProductUserCommentStatus','').subscribe(data => {
  //        this.ProductUserCommentStatus = data.filter(a=>a.CodeINT!=0);
  //        console.log(this.ProductUserCommentStatus);

  //    });

  //}



}

