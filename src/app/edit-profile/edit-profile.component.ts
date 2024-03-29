import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SettingsComponent } from "../settings/settings.component";

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.css',
    imports: [RouterOutlet, SidebarComponent, SettingsComponent]
})
export class EditProfileComponent {

}
