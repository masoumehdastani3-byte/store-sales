export class Order {
  Email: string;
  Mobile: string;
  Address: string;
  FullName: string;
  Description: string;
  CustomerID: Number;
  City: string;
  CodeMelli: string;
  Lang: string;
  LogUser: string;
  CompanyID: string;
  TotalDiscount: Number;
  Total: Number;
  /** 1 = ایران‌زمین (درگاه فعلی)، 2 = صادرات (سپهر) */
  PaymentGateway?: Number;
  OrderDetails: OrderDetails[];
}

export class OrderDetails {

  OrderID: Number;
  ProductID: Number;
  ProducName: string;
  ShoppingCount: Number;
  AvalaibleCount: Number;
  UnitPrice: Number;
  TotalPrice: Number;
  TotalDiscount: Number;
  Total: Number;


}
export class PaymentRequestResponseModel
	{
		status: Number;
		Message: string;
    Token: Number;
    location:string;
	}