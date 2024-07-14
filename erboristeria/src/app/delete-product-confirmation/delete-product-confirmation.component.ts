import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Iproduct } from '../models/iproduct';
import { ProductService } from '../pages/product.service';

@Component({
  selector: 'app-delete-product-confirmation',
  templateUrl: './delete-product-confirmation.component.html',
  styleUrl: './delete-product-confirmation.component.scss'
})
export class DeleteProductConfirmationComponent {
  @Input() productToDelete: Iproduct | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete() {
    if (this.productToDelete) {
      this.activeModal.close(this.productToDelete.id); // Invia l'ID del prodotto da eliminare
    }
  }

  cancelDelete() {
    this.activeModal.dismiss(); // Chiude il modal senza confermare l'eliminazione
  }
}

