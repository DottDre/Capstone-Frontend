import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-confirmation-modal',
  templateUrl: './order-confirmation-modal.component.html',
  styleUrl: './order-confirmation-modal.component.scss'
})
export class OrderConfirmationModalComponent {
  successful: boolean = true; // Flag per determinare il messaggio da mostrare

  constructor(public activeModal: NgbActiveModal) {}



  close() {
    this.activeModal.close(); // Chiude il modale quando l'utente preme il pulsante "Chiudi"
  }

}

