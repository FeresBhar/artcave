export class ComRequest {
    
    username!:string;
    description!:string;
    price!:string;
    status!:string;

    constructor(username:string,description:string,status:string,price:string){
        this.username = username;
        this.description = description;
        this.status = status;
        this.price = price;
    }


}
