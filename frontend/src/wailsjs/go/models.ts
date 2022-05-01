/* Do not change, this code is generated from Golang structs */

export {};

export class Garment {
    id: number[];
    order_id: number[];
    cuantity: string;
    category: string;
    gendre: string;
    color: string;
    brand: string;
    price: string;
    comment: string;
    defects: string;
    service_type: string;

    static createFrom(source: any = {}) {
        return new Garment(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.id = source["id"];
        this.order_id = source["order_id"];
        this.cuantity = source["cuantity"];
        this.category = source["category"];
        this.gendre = source["gendre"];
        this.color = source["color"];
        this.brand = source["brand"];
        this.price = source["price"];
        this.comment = source["comment"];
        this.defects = source["defects"];
        this.service_type = source["service_type"];
    }
}
export class Order {
    ID: number[];
    identifier: string;
    recieved_date: string;
    delivery_date: string;
    client_name: string;
    client_id: string;
    client_address: string;
    client_phone: string;
    client_email: string;
    garment_total: number;
    payment_total_payed: string;
    payment_total: string;
    payment_total_real: string;
    service_type: string;
    garments: Garment[];

    static createFrom(source: any = {}) {
        return new Order(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.ID = source["ID"];
        this.identifier = source["identifier"];
        this.recieved_date = source["recieved_date"];
        this.delivery_date = source["delivery_date"];
        this.client_name = source["client_name"];
        this.client_id = source["client_id"];
        this.client_address = source["client_address"];
        this.client_phone = source["client_phone"];
        this.client_email = source["client_email"];
        this.garment_total = source["garment_total"];
        this.payment_total_payed = source["payment_total_payed"];
        this.payment_total = source["payment_total"];
        this.payment_total_real = source["payment_total_real"];
        this.service_type = source["service_type"];
        this.garments = this.convertValues(source["garments"], Garment);
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









export class Time {


    static createFrom(source: any = {}) {
        return new Time(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);

    }
}
export class Price {
    id: number[];
    category: string;
    price_washing: string;
    price_ironing: string;
    created_at: Time;

    static createFrom(source: any = {}) {
        return new Price(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.id = source["id"];
        this.category = source["category"];
        this.price_washing = source["price_washing"];
        this.price_ironing = source["price_ironing"];
        this.created_at = this.convertValues(source["created_at"], Time);
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





export class Client {
    id: number[];
    name: string;
    identification: string;
    address: string;
    phone: string;
    email: string;
    created_at: Time;

    static createFrom(source: any = {}) {
        return new Client(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.id = source["id"];
        this.name = source["name"];
        this.identification = source["identification"];
        this.address = source["address"];
        this.phone = source["phone"];
        this.email = source["email"];
        this.created_at = this.convertValues(source["created_at"], Time);
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





