export class profile {
    
    Username!:String;
    Description!:String;
    skills!:String[];
    Headline!:String;
    pfpURL!:String;
    images?:String[];

    constructor(Username:String,Description:String,skills: String[],Headline:String,pfpURL:String,images?:String[]){
        this.Username = Username;
        this.Description = Description;
        this.skills = skills;
        this.Headline = Headline;
        this.pfpURL = pfpURL;
        this.images = images;
    }


}
