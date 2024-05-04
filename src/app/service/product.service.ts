import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/product.model";
import { Catetory } from "../model/catetory.model";

@Injectable({
    providedIn : 'root'
})
export class ProductSerivce{
    private apiProduct = `${environment.api}/product/getAll`;
    private apiCatetory = `${environment.api}/catetory/get`;
    private apiProductDetail = `${environment.api}/product/get`;
    private apiProductByIds = `${environment.api}/product/get_ids`;


    constructor(private http: HttpClient){}

    getProducts(keywords : string, page : number, limit : number):Observable<Product[]>{
        const params = new HttpParams()
        .set('keywords', keywords)
        .set('page', page.toString())
        .set('limit', limit.toString());
    return this.http.get<Product[]>(this.apiProduct, {params});
    }

    getCatetory():Observable<Catetory[]>{
        return this.http.get<Catetory[]>(this.apiCatetory);
    }

    getProductDetail(name : string):Observable<Product>{
        const params = new HttpParams().set('name', name)
        return this.http.get<Product>(this.apiProductDetail,{params});
    }

    getProductByIds(productIDs : number[]):Observable<Product[]>{
        const params = new HttpParams().set('ids', productIDs.join(','));
        return this.http.get<Product[]>(this.apiProductByIds, {params});
    }
}