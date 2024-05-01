export class ArtistCommission {
    
    title!:string;
    cominstru!:string;
    cominfo!:string;
    imageURL!:string;
    minprice!:number;
    comID!:number

    constructor(title:string,cominstru:string,minprice:number,imageURL:string,cominfo:string,comID:number){
        this.title = title;
        this.minprice = minprice;
        this.cominstru = cominstru;
        this.imageURL = imageURL;
        this.cominfo = cominfo;
        this.comID = comID;
    }


}
