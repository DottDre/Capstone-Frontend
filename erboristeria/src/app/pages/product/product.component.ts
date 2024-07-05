import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { ProductService } from '../product.service';
import { CategoriesService } from '../categories.service';
import { Icategory } from '../../models/icategory';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  newProduct: Partial<Iproduct> = {};
  newCategory: Partial<Icategory> = {};
  categories: Icategory[] = [];
  ImageFile: File | null = null;

  constructor(
    private prodSvc: ProductService,
    private catSvc: CategoriesService
  ) {}

  loadCategories() {
    this.catSvc.getAll().subscribe(
      (categories: Icategory[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Errore nel caricamento delle categorie', error);
      }
    );
  }

  addProduct() {
    if (!this.newProduct || !this.ImageFile) {
      console.error('Dati del prodotto o file immagine mancanti');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newProduct.name as string);
    formData.append('description', this.newProduct.description as string);
    formData.append('stock', this.newProduct.stock as any);
    formData.append('price', this.newProduct.price as any);
    formData.append('categoryId', this.newProduct.categoryId as any);
    formData.append('imgFile', this.ImageFile);
    this.prodSvc.createProductWithImage(formData).subscribe(() => {
      this.newProduct = {};
      this.ImageFile = null;
    }, error => {
      console.error('Errore nella creazione del prodotto', error);
    });
  }

  addCategory() {
    this.catSvc.create(this.newCategory).subscribe(() => {
      this.newCategory = {};
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.ImageFile = file;
    }
  }

  uploadImage(): void {
    if (this.ImageFile) {
      this.prodSvc.uploadImageForProduct(this.ImageFile).subscribe(
        (response) => {
          console.log('Immagine caricata con successo:', response);
        },
        (error) => {
          console.error('Errore durante il caricamento dell\'immagine:', error);
        }
      );
    }
  }
}
