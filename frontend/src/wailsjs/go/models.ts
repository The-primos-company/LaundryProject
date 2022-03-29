/* Do not change, this code is generated from Golang structs */

export {};

export class Time {


    static createFrom(source: any = {}) {
        return new Time(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);

    }
}
export class Order {
    ID: number[];
    recieved_date: Time;
    delivery_date: Time;
    client_name: string;
    client_id: string;
    client_address: string;
    client_phone: string;
    client_email: string;

    static createFrom(source: any = {}) {
        return new Order(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.ID = source["ID"];
        this.recieved_date = this.convertValues(source["recieved_date"], Time);
        this.delivery_date = this.convertValues(source["delivery_date"], Time);
        this.client_name = source["client_name"];
        this.client_id = source["client_id"];
        this.client_address = source["client_address"];
        this.client_phone = source["client_phone"];
        this.client_email = source["client_email"];
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
