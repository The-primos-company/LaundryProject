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
    payment_paid: string;
    service_type: string;
    payed_at: string;
    delivered_at: string;
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
        this.payment_paid = source["payment_paid"];
        this.service_type = source["service_type"];
        this.payed_at = source["payed_at"];
        this.delivered_at = source["delivered_at"];
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




export class OrderPagination {
    orders: Order[];
    pages: number;
    payment_pending: string;
    payment_recolected: string;
    payment_factured: string;
    payment_paid: string;

    static createFrom(source: any = {}) {
        return new OrderPagination(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.orders = this.convertValues(source["orders"], Order);
        this.pages = source["pages"];
        this.payment_pending = source["payment_pending"];
        this.payment_recolected = source["payment_recolected"];
        this.payment_factured = source["payment_factured"];
        this.payment_paid = source["payment_paid"];
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

export class SumaryGarment {
    id: number;
    cuantity: number;
    category: string;
    service_type: string;
    price_total: string;
    cost_total: string;
    utilities: string;

    static createFrom(source: any = {}) {
        return new SumaryGarment(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.id = source["id"];
        this.cuantity = source["cuantity"];
        this.category = source["category"];
        this.service_type = source["service_type"];
        this.price_total = source["price_total"];
        this.cost_total = source["cost_total"];
        this.utilities = source["utilities"];
    }
}
export class SumaryGarmentsResults {
    data: SumaryGarment[];
    total_garments: number;
    total_price_total: string;
    total_cost: string;
    total_utilities: string;

    static createFrom(source: any = {}) {
        return new SumaryGarmentsResults(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.data = this.convertValues(source["data"], SumaryGarment);
        this.total_garments = source["total_garments"];
        this.total_price_total = source["total_price_total"];
        this.total_cost = source["total_cost"];
        this.total_utilities = source["total_utilities"];
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
    price_dyeing: string;
    cost_washing: string;
    cost_ironing: string;
    cost_dyeing: string;

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
        this.price_dyeing = source["price_dyeing"];
        this.cost_washing = source["cost_washing"];
        this.cost_ironing = source["cost_ironing"];
        this.cost_dyeing = source["cost_dyeing"];
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






