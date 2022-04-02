export interface go {
  "main": {
    "App": {
		CreateOrder(arg1:Order):Promise<Order>
		GetNextOrderIdentifier():Promise<number>
		GetOrdersList(arg1:number,arg2:number):Promise<Array<Order>>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
