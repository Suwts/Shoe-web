import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../model/user/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.api}/auth/signup`;
  private apiLogin = `${environment.api}/auth/signin`;
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

  register(data : Register):Observable<any>{
    return this.http.post(this.apiRegister, data, this.apiConfig)
  }

  login(data : Login): Observable<any>{
    return this.http.post(this.apiLogin, data, this.apiConfig)
  }
}
