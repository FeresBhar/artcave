export class profile {
    
    username!:String;
    description!:String;
    skills!:String[];
    headline!:String;
    avatar?:String;
    images!:String[];

    constructor(username:String,description:String,skills: String[],headline:String,images:String[],avatar?:String){
        this.username = username;
        this.description = description;
        this.skills = skills;
        this.headline = headline;
        this.avatar = avatar;
        this.images = images;
    }


}
