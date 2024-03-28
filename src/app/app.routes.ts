import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FeedComponent } from './feed/feed.component';
import { ContactComponent } from './contact/contact.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
    {path:'explore' ,component:FeedComponent,title:"Explore"},
    {path:'' , redirectTo:"/explore",pathMatch:"full"},
    {path:'commissions' , component:CommissionsComponent, title:"Commisions"},
    {path:'contact' , component:ContactComponent, title:"Contact"},
    {path:'login' , component:LoginComponent, title:"Login"},
    {path:'sign-up' , component:SignUpComponent,title:"Sign-up"},
    {path:'profile' , component:ProfileComponent,title:"Profile"},
    {path:'profile/edit' , component:EditComponent,title:"Edit profile"},
    {path:'profile/upload' , component:UploadComponent,title:"Upload work"},
    {path:'**' ,component:NotfoundComponent,title:"404 not found"}

];