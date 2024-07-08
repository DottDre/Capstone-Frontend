import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Iproduct } from '../models/iproduct';
import { ProductService } from '../pages/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  @Input() newProduct: Partial<Iproduct> = {};
  ImageFile: File | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(public activeModal: NgbActiveModal, private prodSvc: ProductService) {}

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

    this.prodSvc.createProductWithImage(formData).subscribe({
      next: (createdProduct) => {
        this.activeModal.close(createdProduct); // Passa il prodotto creato al modal chiamante
      },
      error: (error) => {
        console.error('Errore nella creazione del prodotto', error);
      },
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.ImageFile = file;
    }
  }
}
