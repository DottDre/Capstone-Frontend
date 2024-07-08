import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Iproduct[] = []

  producSubject = new BehaviorSubject<Iproduct[]>([])

  products$ = this.producSubject.asObservable()

  constructor(
    private http:HttpClient,
    private authSvc:AuthService

  ) { }

  apiUrl:string = environment.producUrl


  getAll():Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>(this.apiUrl)
    .pipe(tap(prod =>{
      this.producSubject.next(prod)
      this.products = prod
    }))
  }
  getById(id:number):Iproduct | null{
    return this.products.find(u => u.id == id) || null
  }

  updateProductWithImage(productId: number, formData: FormData): Observable<Iproduct> {
    console.log(formData);

    return this.http.put<Iproduct>(`${this.apiUrl}/${productId}`, formData);
    ;

  }


  create(product:Partial<Iproduct>){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authSvc.getAccessToken()}`
      })
      }
    return this.http.post<Iproduct>(this.apiUrl, product)

}
createProductWithImage(formData: FormData): Observable<Iproduct> {
  const httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.authSvc.getAccessToken()}`
    })
  };
  return this.http.post<Iproduct>(this.apiUrl, formData);
}
uploadImageForProduct(file: File) {
  const formData = new FormData();
  formData.append('imgFile', file);

  return this.http.post<any>(`${this.apiUrl}/upload-image`, formData);

}
delete(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
}
}


