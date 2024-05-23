import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CommentDTO } from "../model/comment.model";
import { Observable, Observer } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})

export class CommentService{
    private apiCreate = `${environment.api}/comment/create`;
    private apiGet = `${environment.api}/comment/get`;

    private apiConfig = {
        headers: this.createHeaders(),
      }
      constructor( private http:HttpClient) { }
    
      private createHeaders():HttpHeaders{
        return new HttpHeaders({
          'Content-Type':'application/json',
          'Accept-language':'vi'
        })
      }

    createCmt(data : CommentDTO) :Observable<any>{
        return this.http.post(this.apiCreate, data, this.apiConfig);
    } 

    getCmt() : Observable<CommentDTO[]>{
        return this.http.get<CommentDTO[]>(this.apiGet);
    }
}