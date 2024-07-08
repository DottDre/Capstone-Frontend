import { Icategory } from "./icategory";

export interface Iproduct {
  id:number,
  name:string,
  description:string,
  price:number,
  stock:number,
  category:Icategory
  img?: string;
}
