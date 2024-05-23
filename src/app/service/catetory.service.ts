import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Catetory } from "../model/catetory.model";

@Injectable({
    providedIn : 'root'
})
export class CatetorySerivce{
    private apiGet = `${environment.api}/catetory/getById`;
    private apiGetAll = `${environment.api}/catetory/get`;

    constructor(
        private http : HttpClient
    ){}

    getCatetory(id: number) : Observable<any>{
        const params = new HttpParams().set('id', id.toString());
        return this.http.get(this.apiGet, {params});
    }
    getAllCatetory() : Observable<Catetory[]>{
        return this.http.get<Catetory[]>(this.apiGetAll);
    }
}