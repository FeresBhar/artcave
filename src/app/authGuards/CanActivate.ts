import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";

export const CanActivate = () => {
    const authservice = inject(AuthService);
    const router = inject(Router);
    if(authservice.isLoggedIn()){
        return true;
    }
    else{
        router.navigate(['/login']);
        return false;
    }
}