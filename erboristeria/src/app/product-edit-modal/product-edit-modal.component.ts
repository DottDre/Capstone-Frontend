import { Component, Input } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../pages/product.service';


@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrl: './product-edit-modal.component.scss'
})
export class ProductEditModalComponent {
  @Input() product!: Iproduct;
  ImageFile: File | null = null;

  constructor(public activeModal: NgbActiveModal, private prodSvc: ProductService) {}

  saveProduct() {
    if (!this.product || !this.product.id) {
      console.error('Dati del prodotto non validi');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name || '');
    formData.append('description', this.product.description || '');
    formData.append('stock', this.product.stock?.toString() || '');
    formData.append('price', this.product.price?.toString() || '');
    formData.append('categoryId', this.product.categoryId?.toString() || '');

    if (this.ImageFile) {
      formData.append('imgFile', this.ImageFile);
    }

    this.prodSvc.updateProductWithImage(this.product.id, formData).subscribe({
      next: (updatedProduct) => {
        this.activeModal.close(updatedProduct);
      },
      error: (error) => {
        console.error('Errore nella modifica del prodotto', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.ImageFile = file;
    }
  }

  cancel() {
    this.activeModal.dismiss('Cancel');
  }
}
