export class profile {
    
    Username!: string;
    Description!: string;
    email!: string;
    categories?: string[];
    Headline!: string;
    pfpURL!: string;
    public!: string;
    images?: { url: string; title: string; }[];

    constructor(Username: string, email: string, Description: string, Headline: string, pfpURL: string, pub: string, categories?: string[], images?: { url: string; title: string; }[]) {
        this.Username = Username;
        this.Description = Description;
        this.email = email;
        this.categories = categories;
        this.Headline = Headline;
        this.pfpURL = pfpURL;
        this.images = images;
        this.public = pub;
    }
}
