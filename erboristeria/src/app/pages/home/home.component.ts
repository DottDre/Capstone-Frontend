import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  images = [
    { url: 'https://picsum.photos/200/300', alt: 'Prima immagine', title: 'Prodotti per la cura della pelle', description: 'Scopri la nostra gamma di prodotti naturali per la cura della pelle, dermatologicamente testati.' },
    { url: 'https://picsum.photos/200/300', alt: 'Seconda immagine', title: 'Integratori alimentari', description: 'Integratori naturali per sostenere la tua salute e il tuo benessere quotidiano.' },
    { url: 'https://picsum.photos/200/300', alt: 'Terza immagine', title: 'Tisane e infusi', description: 'Scopri le nostre selezioni di tisane e infusi bio, ideali per ogni momento della giornata.' },
    { url: 'https://picsum.photos/200/300', alt: 'Quarta immagine', title: 'Oli essenziali', description: 'Esplora i nostri oli essenziali naturali, perfetti per aromaterapia e trattamenti di bellezza.' },
    { url: 'https://picsum.photos/200/300', alt: 'Quinta immagine', title: 'Prodotti per la casa', description: 'Prodotti ecologici per la pulizia della casa, sicuri per l\'ambiente e per te.' }
  ];
  constructor(
    private prodSvc: ProductService,
    config: NgbCarouselConfig
  ){
    config.interval = 5000;  // Intervallo di 5 secondi tra le slide (opzionale)
    config.wrap = true;      // Il carosello torna alla prima slide dopo l'ultima (opzionale)
    config.keyboard = true;  //
  }


}
