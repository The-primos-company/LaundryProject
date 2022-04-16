export interface go {
  "service": {
    "OrderService": {
		CreateOrder(arg1:Order):Promise<Order>
		GetNextOrderIdentifier():Promise<number>
		GetOrderByClientName(arg1:string,arg2:number,arg3:number):Promise<Array<Order>>
		GetOrderByIdentifier(arg1:string,arg2:number,arg3:number):Promise<Array<Order>>
		GetOrdersList(arg1:number,arg2:number):Promise<Array<Order>>
    },
    "PriceService": {
		CreatePrice(arg1:Price):Promise<Price>
		DeletePrice(arg1:UUID):Promise<boolean>
		GetPricesByCategory(arg1:number,arg2:number,arg3:string):Promise<Array<Price>>
		GetPricesList(arg1:number,arg2:number):Promise<Array<Price>>
		UpdatePrice(arg1:Price):Promise<Price>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
