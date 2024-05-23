import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Brand } from "../model/brand.model";

@Injectable({
    providedIn : 'root'
})
export class BrandSerivce{
    private apiGet = `${environment.api}/brand/getById`;
    private apiGetAll = `${environment.api}/brand/get`;

    constructor(
        private http : HttpClient
    ){}

    getBrand(id: number) : Observable<any>{
        const params = new HttpParams().set('id', id.toString());
        return this.http.get(this.apiGet, {params});
    }
    
    getBrandAll():Observable<Brand[]>{
        return this.http.get<Brand[]>(this.apiGetAll);
    }
}