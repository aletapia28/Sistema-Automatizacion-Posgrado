import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { JsonPipe } from '@angular/common'
import { resolve } from 'dns'

export interface UserDetails {
  correo: string
  password: string
 
}
//contiene el token del backend al frontend
interface TokenResponse {
  token: string
}

export interface TokenPayload {
    correo: string
    password: string

}
export interface Tokenuser{
  correo:string

}
export interface Tokenasistant{
  correo:string
  nombre: string
  cedula:string

}

@Injectable()
export class AuthenticationService {

  //declaraciones
  private token: string
  


  constructor(private http: HttpClient, private router: Router) {}

  getUsers(){
    return this.http.get('routerperfil');
  }
  getUserCorreo(){
    return this.http.get('router/perfil');
  }

  public registerUser(corr,contras){
    const usuario = {
      corr: corr,
      contras:contras
    };
    return this.http.post('router/register',usuario)
  }


  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  //decodes roke
  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return true
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`/router/register`, user)
    
  }
  public registerasist(user: Tokenasistant): Observable<any> {
    return this.http.post(`/router/registerasistente`, user)
    
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/router/login`, user)
    
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        
        return data
      })
    )
    
    return request
  }
  
  /*public isSuper(supuser): boolean {

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    return true
  }*/
  public isSuper(user: Tokenuser): Observable<any> {
    return this.http.post(`/router/isSuper`, user)
    
  }


  public profile(): Observable<any> {
    return this.http.get(`/router/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}