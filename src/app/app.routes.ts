import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FeedComponent } from './feed/feed.component';
import { ContactComponent } from './contact/contact.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SocialsComponent } from './socials/socials.component';
import { ChangeDataProfileComponent } from './change-data-profile/change-data-profile.component';
import { CanActivate } from './authGuards/CanActivate';
import { SendCommissionComponent } from './send-commission/send-commission.component';
import { ArtistCommissionsComponent } from './artist-commissions/artist-commissions.component';
import { ArtistPortfolioComponent } from './artist-portfolio/artist-portfolio.component';


export const routes: Routes = [
    {path:'explore' ,component:FeedComponent,title:"Explore"},
    {path:'' , redirectTo:"/explore",pathMatch:"full"},
    {path:'commissions' , component:CommissionsComponent, title:"Commisions",canActivate : [(CanActivate)]},
    {path:'contact' , component:ContactComponent, title:"Contact"},
    {path:'login' , component:LoginComponent, title:"Login"},
    {path:'sign-up' , component:SignUpComponent,title:"Sign-up"},
    {path:'profile/edit' , component:EditProfileComponent,title:"Edit profile", children : [
        { path: 'profile', component: ChangeDataProfileComponent },
        { path: 'socials', component: SocialsComponent },
        { path: 'settings', component: SettingsComponent }
      ]
    },
    {path:'profile/upload' , component:UploadComponent,title:"Upload art"},
    {path:'profile/send-commision' ,component : SendCommissionComponent,canActivate : [CanActivate]},
    {path:'profile/:username' , component:ProfileComponent,title:"Profile" , children : [
      { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      {path:'portfolio', component:ArtistPortfolioComponent,title:'Portfolio'},
      {path:'commissions', component:ArtistCommissionsComponent,title:'Commissions'}
      ]
    },
    {path:'**' ,component:NotfoundComponent,title:"404 not found"}
    
];