import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const auth = inject(AuthService);
    let token = auth.token;
    if (token) {
        const request = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(request);
      }
      else{
        return next(req);
      }
};