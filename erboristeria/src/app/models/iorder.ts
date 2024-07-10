import { IOrderItem } from "./iorder-item";

export interface IOrder {
  id?: number; // Facoltativo, perché potrebbe non essere disponibile in una richiesta di creazione
  userId: number;
  orderDate?: string; // Facoltativo, perché potrebbe non essere disponibile in una richiesta di creazione
  totalAmount?: number; // Facoltativo, perché potrebbe non essere disponibile in una richiesta di creazione
  orderItems: IOrderItem[];
}
