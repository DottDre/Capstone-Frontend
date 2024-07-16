
import { IordersItem } from "./iorders-item";
import { Iuser } from "./iuser";

export interface IordersPlaced {
  id?: number; // Facoltativo, perché potrebbe non essere disponibile in una richiesta di creazione
  user: Iuser;
  orderDate?: string; // Facoltativo, perché potrebbe non essere disponibile in una richiesta di creazione
  totalAmount?: number; // Facoltativo, perché potrebbe non essere disponibile in una richiesta di creazione
  orderItems: IordersItem[];
}
