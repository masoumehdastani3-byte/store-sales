import { Injectable, APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { User } from './modules/User';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpResponse, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from './service/api.service';
import { them } from './service/themplate.service';
import { BasicData } from './modules/BasicData.module';
import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = this.them.configUrlBasic;
  configUrlBasic = this.them.configUrlBasic;
  configUrl: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User;

 
  public Language: BasicData[];

  constructor(
    private http: HttpClient,
    public router: Router,
    public service: ConfigService,
    public them: them,
    public titleService: Title

  ) {

  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(UserName: string, password: string, Lang: string) {

    return this.http.get<any>(`${this.endpoint}/Login/Get`, {
      params: {
        Lang: Lang,
        UserName: UserName,
        Password: password
      }
    }
    ).subscribe((res: any) => {

      console.log(res);
      this.currentUser = res;
      if (res[0].Status == 1) {
        
        localStorage.setItem('UserName', res[0].UserName)
        localStorage.setItem('UserID', res[0].UserID)
        localStorage.setItem('RoleID', res[0].RoleID)
        localStorage.setItem('CompanyID', res[0].CompanyID)
        localStorage.setItem('UserProfile', res[0].Name + ' ' + res[0].Family)
        localStorage.setItem('access_token', res[0].TokenID)
        localStorage.setItem('Company_Default', res[0].IsDefault)
        localStorage.setItem('CompanyName', res[0].CompanyName)
        localStorage.setItem('CompanyLogo', res[0].LogoUrl)

        console.log(this.currentUser);
        this.router.navigate(['/Panel/defualt-page']);
      }
      else {

        Swal.fire('Error', res[0].Message);
      }
    })
  }
  onGetRestaurantName(Lang: string, Website: string) {
    this.service.FetchCompany_WesiteUrlGet(Lang,'', Website).subscribe(data => {
      
      this.them.CompanyName = data[0].Name.toString();
      
      this.them.CompanyID = data[0].ID.toString();

      this.them.BackgroundImageUrl = data[0].BackgroundUrl != null ? this.them.configUrlBasicImage + data[0].BackgroundUrl.toString() : '~/assets/image/home.jpg';
      this.them.LogoUrl = data[0].LogoUrl != null ? this.them.configUrlBasicImage + data[0].LogoUrl.toString() : '~/assets/image/logo.jpg';

      document.body.style.backgroundImage = "url('" + this.them.BackgroundImageUrl + "')";
      document.body.style.backgroundSize = 'cover';

      document.getElementById('favicon').setAttribute("href", this.them.LogoUrl);
      this.titleService.setTitle(this.them.CompanyName);
    });
    
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getUserName() {
    if (this.isLoggedIn == true) {
      return localStorage.getItem('UserName');
    }
    else {
      this.router.navigate(['login']);
    }

  }
  getCompany_Default() {
    if (this.isLoggedIn == true) {
      return localStorage.getItem('Company_Default');
    }
    else {
      this.router.navigate(['login']);
    }

  }
  getCompanyLogo() {
    return this.them.configUrlBasicImage + localStorage.getItem('CompanyLogo');
    
  }
  getCompanyName() {
    if (this.isLoggedIn == true) {

      return localStorage.getItem('CompanyName');
    }
    else {
      this.router.navigate(['login']);
    }

  }
  getCompanyID() {
    if (this.isLoggedIn == true) {
      return localStorage.getItem('CompanyID');
    }
    else {
      this.router.navigate(['login']);
    }

  }
  getUserID() {
    if (this.isLoggedIn == true) {
      return localStorage.getItem('UserID');
    }
    else {
      this.router.navigate(['login']);
    }

  }
  getRoleID() {
    if (this.isLoggedIn == true) {
      return localStorage.getItem('RoleID');
    }
    else {
      this.router.navigate(['login']);
    }

  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/UserProfile/Get?_id=${id}`;
    return this.http.get(api).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  onLanguageGet(Lang: string) {

    this.service.FetchBaseData_GroupType('', this.getUserName(), 'Language', '').subscribe(data => {


      for (let i = 0; i < data.length; i++) {
       
        if (data[i].CodeChar == Lang) {

          data[i].IsDefault = true;
        }
      }
      this.Language = data.sort((a, b) => a.IsDefault < b.IsDefault ? -1 : a.IsDefault > b.IsDefault ? 1 : 0)
      console.log(this.Language);
    });

  }
  // Error 
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
}
