import { Injectable } from '@angular/core';
import { Iuser } from '../models/iuser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { ILoginData } from '../models/ilogin-data';

type AccessData ={
  user:Iuser,
  token:string,
  role:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper:JwtHelperService = new JwtHelperService()
  authSubject = new BehaviorSubject<Iuser|null>(null);

  user$ = this.authSubject.asObservable()
  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncIsLoggedIn = user)
  )
  syncIsLoggedIn:boolean = false;

  constructor(
    private http:HttpClient,
    private router:Router
  ) {

    this.restoreUser()
  }

  registerUrl:string = environment.registerUrl
  loginUrl:string = environment.loginUrl

  register(newUser:Partial<Iuser>):Observable<AccessData>{
    return this.http.post<AccessData>(this.registerUrl, newUser)
  }

  login(loginData:ILoginData):Observable<AccessData>{
    return this.http.post<AccessData>(this.loginUrl,loginData)

    .pipe(tap(data => {

      this.authSubject.next(data.user)
      localStorage.setItem('accessData', JSON.stringify(data))
      console.log(data);

      this.autoLogout(data.token)

    }))
  }
  logout(){

    this.authSubject.next(null)
    localStorage.removeItem('accessData')

    this.router.navigate(['/auth/login'])

  }
  getAccessToken():string{
    const userJson = localStorage.getItem('accessData')
    if(!userJson) return '';

    const accessData:AccessData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(accessData.token)) return '';

    return accessData.token
  }
  autoLogout(jwt:string){
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(()=>{
      this.logout()
    },expMs)
  }
  restoreUser(){

    const userJson = localStorage.getItem('accessData')
    if(!userJson) return;

    const accessData:AccessData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(accessData.token)) return;


    this.authSubject.next(accessData.user)
    this.autoLogout(accessData.token)

  }

  errors(err: any) {
    switch (err.error) {
        case "Email and Password are required":
            return new Error('Email e password obbligatorie');
            break;
        case "Email already exists":
            return new Error('Utente esistente');
            break;
        case 'Email format is invalid':
            return new Error('Email scritta male');
            break;
        case 'Cannot find user':
            return new Error('utente inesistente');
            break;
            default:
        return new Error('Errore');
            break;
    }
}
}
