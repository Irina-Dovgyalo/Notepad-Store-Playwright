export interface IApiBasketResponseDataType {
  "id": number;
  "name": string;
  "price": number;
  "count": number;
  "poster": string;
  "discount": number;
}

export interface IApiShoppingCartResponseDataType {
  "response": boolean;
  "basket": IApiBasketResponseDataType[];
  "basketCount": number;
  "basketPrice": number;
}

export interface IApiClearShoppingCartResponseDataType {
  response: boolean;
}
