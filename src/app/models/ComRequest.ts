export class ComRequest {
    reqid!:number;
    username!:string;
    description!:string;
    price!:string;
    status!:string;

    constructor(reqid:number,username:string,description:string,status:string,price:string){
        this.reqid = reqid;
        this.username = username;
        this.description = description;
        this.status = status;
        this.price = price;
    }


}
