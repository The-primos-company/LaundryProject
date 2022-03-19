export interface go {
  "main": {
    "App": {
		CreateOrder(arg1:Order):Promise<Order>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
