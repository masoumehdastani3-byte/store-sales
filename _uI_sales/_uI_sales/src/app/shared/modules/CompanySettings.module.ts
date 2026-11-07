export class CompanySettings {
  PageShow: Number;
  MaxPageShow: Number;
  PageDescription: String;
  Company_Settings: Company_Settings[];
}
export class Company_Settings {
  ResturanID: Number;
  SettingName: String
  SettinCaption: String
  SettingValue: String
  Descriptions: String
  Category: String
  PageShow: Number;
  Active: boolean;
  PageDescription: String;
}
