import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/iorder';
import { Observable } from 'rxjs';
import { IordersPlaced } from '../models/iorders-placed';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.orderUrl; // URL del tuo backend

  constructor(private http: HttpClient) {}

  createOrder(orderRequest: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.baseUrl, orderRequest);
  }

  getOrders(): Observable<IordersPlaced[]> {
    return this.http.get<IordersPlaced[]>(this.baseUrl);
  }

  getOrderById(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.baseUrl}/${id}`);
  }

  updateOrder(id: number, orderRequest: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.baseUrl}/${id}`, orderRequest);
  }

  deleteOrder(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}

