import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn : 'root'
})
export class PaymentService{
    private apiGetPay = `${environment.api}/pay/get`;
    constructor(
        private http : HttpClient,
    ){
        
    }
    getPay(orderID : number): Observable<any>{
        return this.http.get(`${environment.api}/pay/get/${orderID}`, {responseType:'text'});
    }

}