import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, exhaustMap, take } from 'rxjs';

@Injectable() 
export class AuthTokenInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userSub.pipe(take(1), exhaustMap(user => { //exhaustMap = switchMap
            if(!user){
                return next.handle(req); //dernaha parceque malazemch nappliquiw hada linterceptor 3la login w signup 
            }
            let modifiedReq = req.clone({
                headers: req.headers.append('Authorization', `Bearer ${user!.token!}`)
            });
            return next.handle(modifiedReq);
        }));  
    }
}