import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "../service/token.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class TokenInterceptors implements HttpInterceptor{
    constructor(private tokenService : TokenService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const token = this.tokenService.getToken();
       if(token){
        req = req.clone({
            setHeaders:{
                Authorization : `Bearer ${token}`,
            },
        });
       }
       return next.handle(req);  
    }
    
}