import { Iproduct } from './iproduct';
export interface Icategory {
  id:number,
  name:string,
  products:Iproduct[]
}
