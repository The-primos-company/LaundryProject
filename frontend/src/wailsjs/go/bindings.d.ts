export interface go {
  "main": {
    "App": {
		CreateOrder(arg1:Order):Promise<Order>
		GetNextOrderIdentifier():Promise<number>
		GetOrderByClientName(arg1:string,arg2:number,arg3:number):Promise<Array<Order>>
		GetOrderByIdentifier(arg1:string,arg2:number,arg3:number):Promise<Array<Order>>
		GetOrdersList(arg1:number,arg2:number):Promise<Array<Order>>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
