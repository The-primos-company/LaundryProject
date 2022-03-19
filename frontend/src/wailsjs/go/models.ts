/* Do not change, this code is generated from Golang structs */

export {};

export class Client {
    name: string;
    address: string;
    phone: string;

    static createFrom(source: any = {}) {
        return new Client(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.name = source["name"];
        this.address = source["address"];
        this.phone = source["phone"];
    }
}
export class Order {
    identifier: string;
    receivedDate: string;
    deliveryDate: string;
    client?: Client;

    static createFrom(source: any = {}) {
        return new Order(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.identifier = source["identifier"];
        this.receivedDate = source["receivedDate"];
        this.deliveryDate = source["deliveryDate"];
        this.client = this.convertValues(source["client"], Client);
    }

	convertValues(a: any, classs: any, asMap: boolean = false): any {
	    if (!a) {
	        return a;
	    }
	    if (a.slice) {
	        return (a as any[]).map(elem => this.convertValues(elem, classs));
	    } else if ("object" === typeof a) {
	        if (asMap) {
	            for (const key of Object.keys(a)) {
	                a[key] = new classs(a[key]);
	            }
	            return a;
	        }
	        return new classs(a);
	    }
	    return a;
	}
}
