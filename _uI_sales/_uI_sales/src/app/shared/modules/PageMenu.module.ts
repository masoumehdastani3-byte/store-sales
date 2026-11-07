export class PageMenu {
  Active: boolean;
  CompanyID: Number;
  ID: Number;
  MenuTitle: string;
  SystemCode: Number;
  SystemName: string;
}
export class MenuView {

  MenuTitle: string;
  SystemCode: Number;
  subMenus: SubMenu[]=[];
}
export class SubMenu {

  PageTitle: string;
  ID: Number;

}
