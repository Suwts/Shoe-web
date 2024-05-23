import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/product.model";
import { Catetory } from "../model/catetory.model";
import { NewProduct } from "../model/newProduct.model";
import { Image } from "../model/image.model";

@Injectable({
    providedIn : 'root'
})
export class ProductSerivce{
    private apiProduct = `${environment.api}/product/getAll`;
    private apiCatetory = `${environment.api}/catetory/get`;
    private apiProductDetail = `${environment.api}/product/get`;
    private apiProductByIds = `${environment.api}/product/get_ids`;
    private apiDelete = `${environment.api}/product/delete`;
    private apiCreateProduct = `${environment.api}/product/create`;
    private apiCreateImage = `${environment.api}/product/uploads`;

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

    getProductDetail(id : number):Observable<Product>{
        const params = new HttpParams().set('id', id.toString())
        return this.http.get<Product>(this.apiProductDetail,{params});
    }

    getProductByIds(productIDs : number[]):Observable<Product[]>{
        const params = new HttpParams().set('ids', productIDs.join(','));
        return this.http.get<Product[]>(this.apiProductByIds, {params});
    }

    creaetProduct(data : NewProduct, token : string) : Observable<any>{
        return this.http.post(this.apiCreateProduct, data, {
            headers : new HttpHeaders({
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }),
            responseType: 'text'
        });
    }

    createImage(product_id : number, data : Image, token : string):Observable<any>{
        const formData = new FormData();
        formData.append("image", data.image);
        // formData.append("reportProgress", "true");
        return this.http.post(`${environment.api}/product/uploads/ ${product_id}`, formData, {
            headers : new HttpHeaders({
            Authorization: `Bearer ${token}`
        }),
    });
    }

    updateProduct(id : number, data : Product, token : string) : Observable<any>{
        return this.http.put(`${environment.api}/product/update/${id}`, data ,{
            headers : new HttpHeaders({
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`
          }),
          
        })
    }
    deleteProduct(id : number, token : string):Observable<any>{
        const params = new HttpParams().set('id', id.toString());
        return this.http.delete(this.apiDelete, {
          headers : new HttpHeaders({
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        }),
          params});
      }
    
}