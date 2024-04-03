export class profile {
    
    Username!:string;
    Description!:string;
    categories?:string[];
    Headline!:string;
    pfpURL!:string;
    images?:string[];

    constructor(Username:string,Description:string,Headline:string,pfpURL:string,categories?: string[],images?:string[]){
        this.Username = Username;
        this.Description = Description;
        this.categories = categories;
        this.Headline = Headline;
        this.pfpURL = pfpURL;
        this.images = images;
    }


}
