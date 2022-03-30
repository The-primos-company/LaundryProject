/* Do not change, this code is generated from Golang structs */

export {};

export class Order {
    ID: number[];
    recieved_date: string;
    delivery_date: string;
    comments: string;
    client_name: string;
    client_id: string;
    client_address: string;
    client_phone: string;
    client_email: string;
    garment_total: number;
    payment_total_payed: string;
    payment_total: string;
    payment_total_real: string;

    static createFrom(source: any = {}) {
        return new Order(source);
    }

    constructor(source: any = {}) {
        if ('string' === typeof source) source = JSON.parse(source);
        this.ID = source["ID"];
        this.recieved_date = source["recieved_date"];
        this.delivery_date = source["delivery_date"];
        this.comments = source["comments"];
        this.client_name = source["client_name"];
        this.client_id = source["client_id"];
        this.client_address = source["client_address"];
        this.client_phone = source["client_phone"];
        this.client_email = source["client_email"];
        this.garment_total = source["garment_total"];
        this.payment_total_payed = source["payment_total_payed"];
        this.payment_total = source["payment_total"];
        this.payment_total_real = source["payment_total_real"];
    }
}
