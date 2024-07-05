import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Icategory } from '../models/icategory';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = environment.categoryUrl

  constructor(
    private http:HttpClient,
    private authSvc:AuthService
  ) { }

  getAll(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.apiUrl);
  }

  create(product:Partial<Icategory>){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authSvc.getAccessToken()}`
      })
      }
    return this.http.post<Icategory>(this.apiUrl, product)
}}
