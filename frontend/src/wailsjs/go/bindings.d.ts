export interface go {
  "main": {
    "App": {
		CreateOrder(arg1:Order):Promise<Order>
		GetNextOrderIdentifier():Promise<number>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
