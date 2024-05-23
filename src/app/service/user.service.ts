import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../model/user/login.model';
import { DetailUser } from '../model/user/detail.model';
import { User } from '../model/user/user.model';
import { PasswordDTO } from '../model/user/password.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.api}/user/signup`;
  private apiLogin = `${environment.api}/user/signin`;
  private apiDetail = `${environment.api}/user/detail`;
  private apiUpdate = `${environment.api}/user/update`;
  private apiRefresh = `${environment.api}/refreshToken`;
  private apiGetAll = `${environment.api}/user/getAll`;
  private apiDelete = `${environment.api}/user/delete`;
  private apiForgotPassword = `${environment.api}/user/forgot-password`;
  private apiSetPassword = `${environment.api}/user/set-password`;

  private apiConfig = {
    headers: this.createHeaders(),
  }
  constructor(
     private http:HttpClient
  ) { }

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

  getAll(page : number, limit : number) : Observable<User[]>{
    const params = new HttpParams()
    .set('limit', limit.toString())
    .set('page', page.toString());
    return this.http.get<User[]>(this.apiGetAll, {params});
  }

  detail(token : string): Observable<any>{
    return this.http.get(this.apiDetail, {
      headers : new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
      })
    })
  }

  update(userId : number, data : DetailUser ,token : string): Observable<any>{
    return this.http.put(`${environment.api}/user/update/${userId}`, data, {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
    })
  })
}

deleteUser(userID : number, token : string):Observable<any>{
  const params = new HttpParams().set('userID', userID.toString());
  return this.http.delete(this.apiDelete, {
    headers : new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
  }),
    params});
}

setPassword(email: string, data : PasswordDTO): Observable<any>{
  const params = new HttpParams().set('email', email);
  return this.http.put(this.apiSetPassword,data, {params});
}

forgotPassword(email : string): Observable<any>{
  const params = new HttpParams().set('email', email);
  return this.http.put(this.apiForgotPassword, this.apiConfig, {params});
}

  refreshToken(data : DetailUser) : Observable<any>{
    return this.http.post(this.apiRefresh, data,this.apiConfig);
  }

  saveDetailUser(detailUser?: DetailUser){
    try{
      if(detailUser == null || !detailUser){
        return;
      }
      const detail = JSON.stringify(detailUser);
      localStorage.setItem('user', detail);
    }
    catch(error){
      console.error("Error saving detail user to local storage "+error);
    }
  }
  getDetailUser() : DetailUser | null{
    try{
      const detail = localStorage.getItem('user');
      if(detail == null || detail == undefined){
        return null;
      }
      const detailUser = JSON.parse(detail!);
      return detailUser;
    }catch(error){
      console.error("Cannot get detail user from local storage "+error);
    }
  }

  removeDetailUser() : void{
    try{
      localStorage.removeItem('user');
    }catch(error){
      console.error("Cannot remove detail user from local storage "+error);
    }
  }
}
