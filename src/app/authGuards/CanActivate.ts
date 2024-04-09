import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";
import { Observable } from "rxjs";

export const CanActivate = () => {
    const authservice = inject(AuthService);
    const router = inject(Router);
    return new Observable<boolean>((res) => {
        authservice.isLoggedIn().subscribe((isLoggedIn: boolean) => {
            if (isLoggedIn) {
                res.next(true);
            } else {
                router.navigate(['/login']);
                res.next(false);
            }
            res.complete();
        });
    });
}