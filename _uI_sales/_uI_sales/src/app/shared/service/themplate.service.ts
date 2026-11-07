
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian, NgbTypeahead, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
class AlertForm {
  Title: String;
  Body: String;
  Buttom: String
}
class PagSizeInvaite {

}
@Injectable()
export class them {
  public modal_open_edit: boolean = false;
  public AdvanceSearch: boolean = false;
  public modal_open_delete: boolean = false;
  public modal_open_new: boolean = false;
  public modal_open_settings: boolean = false;
  public modal_open_Alert: boolean = false;
  public isVisible: boolean = true;
  public selectedRowID: number;
  public selectRow: boolean = false;
  public isMinSize: boolean = false;
  public loading: boolean = false;
  public DateEvent: NgbDateStruct;
  public cssUrl1: String = "";
  public cssUrl2: String = "";
  public DefaultLanguage: String = 'fa';
  public TotalShopping: string = '';
  public ProductGroup: string = '';
  public ProductGroupForFirst: string = '';
  public ProductGroupName: string = '';
  public ProductGroupNameForFirst: string = '';
  public SiteStause: Number;
  
  
  public configUrlBasic = environment.configUrlBasic;
  public configUrlBasicImage = environment.configUrlBasicImage;
  public ShowReportUrlBasic = environment.ShowReportUrlBasic;
  public ShowCkEditorUrlBasic = environment.ShowCkEditorUrlBasic;
  public configUrlPanel = environment.configUrlPanel;
  //-------------------خصوصیات ظاهری صفحه--------------------
  public BackgroundImageUrl = '/assets/image/home.jpg'
  public LogoUrl = '/assets/image/logo.jpg'
  public HeaderColor = '#2a261f'
  public ButtonColor = '#9a7c38'
  public HeaderFontColor = '#f3eee4'
  public ButtonFontColor = '#fff8ea'
  public PriceColor = '#b89a54'
  public PriceFontColor = '#fff8ea'
  //----------------------------------------------------------
  public PageSize: number = 20;
  public Page: number = 1;
  public PagSizeInvaite: number[] = [20, 20, 30, 50];
  //----------------------------------------------------------
  public AlertLis: AlertForm = { Title: '', Body: '', Buttom: '' };
  public Lang: String = localStorage.getItem('language');
  public CompanyName: string = localStorage.getItem('CompanyName');
  public CompanyID: string = localStorage.getItem('CompanyID');
  public ScrollY :number;
  public PageNumber:string='1';
  //********************SelectALLCheckBox****************
  public selectedAll: any;//Checkbox selected all
  public selectedAny: boolean = false;//Checkbox dont selected all

  constructor(private decimalPipe: DecimalPipe) {

    if (this.Lang == null || this.Lang == undefined) {
      this.Lang = 'fa';
    }
    if (!(window.location.host.includes('localhost:4300') || (window.location.host.includes('localhost:4700'))) && window.location.host.includes('localhost')) {
      
      this.configUrlBasic = environment.configUrlBasic_Local;
      this.configUrlBasicImage = environment.configUrlBasicImage_Local;
      this.ShowReportUrlBasic = environment.ShowReportUrlBasic_Local;
      this.ShowCkEditorUrlBasic = environment.ShowCkEditorUrlLocal;
      this.SiteStause = 2;
    }

    else {
      
      this.configUrlBasic = environment.configUrlBasic;
      this.configUrlBasicImage = environment.configUrlBasicImage;
      this.ShowReportUrlBasic = environment.ShowReportUrlBasic;
      this.ShowCkEditorUrlBasic = environment.ShowCkEditorUrlBasic;
      this.SiteStause = 1;
    }
  }
  public selectAll(Lists: any) {

    Lists.subscribe(lists => {
      lists.forEach(a => {
        a.checked = this.selectedAll;

      });
      if (this.selectedAll == true) {
        this.selectedAny = false;
      }
      else if (this.selectedAll == false && this.selectedAny == true) {
        this.selectedAny = false;

      }
    })

  }
  //*******************************************************
  public parseNumber(num: any): string | null {
    return this.decimalPipe.transform(Number(num), '4.0-0') ?? '0';
  }
  
  public SetLanguage() {

    if (this.Lang == null) {

      this.Lang = this.DefaultLanguage;
    }

  }

  public onclickBackground() {
    this.modal_open_edit = false;
    this.modal_open_new = false;

  }
  public onclickMinSizeModal() {
    this.isMinSize = !this.isMinSize;
  }
  public NewOpen() {
    this.modal_open_new = true;
  }

  public DeleteConfirm(selectedRowID) {


    if (this.selectRow == false) {
      this.SeupAlert(null, 'alert-warning');
      this.ShowAlert('alert-warning');

    }

    else {
      this.modal_open_delete = true;
    }

  }
  public DeleteRowConfirm(selectedRowID) {

    this.modal_open_delete = true;
    this.selectRow == true;
    this.selectedRowID = selectedRowID;

  }
  public SelectRow(postId, checked: boolean) {
    if (checked == true) {
      this.selectRow = true;
    }
    else {
      this.selectRow = false;
    }

    if (this.selectedAll == true && checked == false) {
      this.selectedAny = true;
    }
    else {
      this.selectedAny = false;
    }

    this.selectedRowID = postId;
  }


  public onResetPage(formControl: FormGroup) {

    formControl.reset();
  }

  protected currentPercent = 0;
  protected op = 1;
  protected id;

  public ShowAlert(alertID) {

    this.currentPercent++;
    console.log('currentPercent');
    console.log(this.currentPercent++);
    if (this.currentPercent >= 50) {
      document.getElementById(alertID).style.opacity = "0";
      document.getElementById(alertID).style.display = "none";

      clearTimeout(this.id);

    } else if (this.currentPercent % 5 == 0 || this.currentPercent == 0) {
      console.log('currentPercent++');
      console.log(this.currentPercent++);
      this.op = Number(this.op) - Number(0.1)

      document.getElementById(alertID).style.opacity = this.op.toString();
    }

    if (this.currentPercent < 50) {
      this.id = setTimeout(() => {
        this.ShowAlert(alertID);
      }, 150);
    }

  }
  body: string = '';
  public SeupAlert(AlertLis: AlertForm, alertID) {

    document.getElementById(alertID).style.opacity = "1";
    document.getElementById(alertID).style.display = "block";
    this.body = '';
    if (AlertLis != null) {
      this.body = "<div class='toast-header' >" + AlertLis.Title + "</div>" +
        "<div class='toast-body' >" + AlertLis.Body + "</div > ";
      document.getElementById(alertID).innerHTML = this.body;
    }

    this.currentPercent = 0;
    this.op = 1;
    clearTimeout(this.id);
  }
  public ToDate(dob): NgbDateStruct {
    if (dob) {

      dob = dob.replace('/', '-').replace('/', '-');
      const [year, month, day] = dob.split('-');
      this.DateEvent = {
        year: parseInt(year),
        month: parseInt(month), day:
          parseInt(day.split(' ')[0].trim())
      };
      return this.DateEvent;
    }
  }
  public CheckImageSize(file: File, MaxVal: Number = 300): boolean {

    var max = Number(MaxVal) * (1024);


    if (file.size > max) {
      if (this.Lang.toLowerCase() == 'fa') {
        this.AlertLis.Title = 'خطا'
        this.AlertLis.Body = 'حداکثر حجم مجاز ' + MaxVal.toString() + ' کیلو بایت'
      }
      else {
        this.AlertLis.Title = 'Error'
        this.AlertLis.Body = 'The maximum allowable volume is ' + MaxVal.toString() + ' KB'
      }

      this.SeupAlert(this.AlertLis, 'alert-warning');
      this.ShowAlert('alert-warning');
      return false
    }
    else {
      return true;
    }
  }

  /** مسیر نسخه کوچک در پوشه small: /Product/1/a.jpg → /Product/1/small/a.jpg */
  public getSmallImageUrl(imageUrl: string): string {
    imageUrl = this.normalizeImagePath(imageUrl);
    if (!imageUrl || imageUrl.toLowerCase().includes('.mp4')) {
      return imageUrl || '';
    }
    const normalized = imageUrl.replace(/\\/g, '/');
    if (normalized.toLowerCase().includes('/small/')) {
      return normalized;
    }
    const lastSlash = normalized.lastIndexOf('/');
    if (lastSlash < 0) {
      return 'small/' + normalized;
    }
    return normalized.substring(0, lastSlash + 1) + 'small/' + normalized.substring(lastSlash + 1);
  }

  /** پاک‌سازی کوتیشن و فاصله از مسیر برگشتی API */
  public normalizeImagePath(imageUrl: string): string {
    if (!imageUrl) {
      return '';
    }
    return imageUrl.toString().replace(/^["'\s]+|["'\s]+$/g, '');
  }

  /**
   * آدرس نمایش: پیش‌فرض تصویر کوچک از پوشه small؛ در صورت خطا یک‌بار به بزرگ برمی‌گردد.
   */
  public getDisplayImageUrl(imageUrl: string, item?: any, preferSmall: boolean = true): string {
    imageUrl = this.normalizeImagePath(imageUrl);
    if (!imageUrl) {
      return '';
    }
    if (item && item.__useLargeImage) {
      return this.configUrlBasicImage + imageUrl;
    }
    if (preferSmall) {
      return this.configUrlBasicImage + this.getSmallImageUrl(imageUrl);
    }
    return this.configUrlBasicImage + imageUrl;
  }

  /** آدرس کامل تصویر کوچک (لیست‌ها) */
  public getSmallImageFullUrl(imageUrl: string): string {
    return this.getDisplayImageUrl(imageUrl, null, true);
  }

  /** آدرس کامل تصویر بزرگ (بزرگ‌نمایی) */
  public getLargeImageFullUrl(imageUrl: string): string {
    return this.getDisplayImageUrl(imageUrl, null, false);
  }

  /**
   * Fallback امن: فقط یک‌بار به تصویر بزرگ سوئیچ می‌کند؛ سپس onerror قطع می‌شود.
   */
  public onSmallImageError(event: Event, imageUrl: string, item?: any): void {
    const img = event && (event.target as HTMLImageElement);
    if (!img) {
      return;
    }
    imageUrl = this.normalizeImagePath(imageUrl);

    if ((item && item.__imgErrorHandled) || img.getAttribute('data-img-fb') === '1') {
      img.onerror = null;
      return;
    }

    if (item) {
      item.__useLargeImage = true;
      item.__imgErrorHandled = true;
    }
    img.setAttribute('data-img-fb', '1');
    img.onerror = null;
    if (imageUrl) {
      img.src = this.configUrlBasicImage + imageUrl;
    }
  }
  //------------------------تطابق اسم ها با هم -------------------
  public Soundex(name) {
    let s = [];
    let si = 1;
    let c;

    //              ABCDEFGHIJKLMNOPQRSTUVWXYZ
    let mappings = "01230120022455012623010202";

    s[0] = name[0].toUpperCase();

    for (let i = 1, l = name.length; i < l; i++) {
      c = (name[i].toUpperCase()).charCodeAt(0) - 65;

      if (c >= 0 && c <= 25) {
        if (mappings[c] != '0') {
          if (mappings[c] != s[si - 1]) {
            s[si] = mappings[c];
            si++;
          }

          if (si > 3) {
            break;
          }
        }
      }
    }

    if (si <= 3) {
      while (si <= 3) {
        s[si] = '0';
        si++;
      }
    }

    return s.join("");
  }
  public playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/bright.mp3";
    audio.load();
    audio.play();

  }
  public formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  public gregorian_to_jalali(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    if (days < 186) {
      jm = 1 + ~~(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + ~~((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    
    return jy+'-' +jm+'-'+ jd;
  }

  public jalali_to_gregorian(jy, jm, jd) {
    var sal_a, gy, gm, gd, days;
    jy += 1595;
    days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy = 400 * ~~(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gy += 100 * ~~(--days / 36524);
      days %= 36524;
      if (days >= 365) days++;
    }
    gy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
      gy += ~~((days - 1) / 365);
      days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
    return [gy, gm, gd];
  }

}

