import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { OrderDTO } from "../model/order.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})
export class OrderService{
    private apiCreateOrder = `${environment.api}/order/create`;
    private apiGetRevenue = `${environment.api}/order/revenue`;

    private apiConfig = {
        headers: this.createHeaders(),
      }
    constructor(private http : HttpClient) {
    }
    private createHeaders():HttpHeaders{
        return new HttpHeaders({
          'Content-Type':'application/json',
          'Accept-language':'vi'
        })
      }
    getRevenue(year:number, month:number, token:string) : Observable<any>{
      const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString())
      return this.http.get(this.apiGetRevenue, {
        headers : new HttpHeaders({
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
      }),
      params});
    }
    
    createOrder(data : OrderDTO) : Observable<any>{
        return this.http.post(this.apiCreateOrder, data, this.apiConfig);
    }

}