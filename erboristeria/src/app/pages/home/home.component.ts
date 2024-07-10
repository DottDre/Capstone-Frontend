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
    { url: 'https://res-console.cloudinary.com/dkwyldbhg/thumbnails/v1/image/upload/v1720620173/Y2FzYWZhY2lsZS1wcm9mdW1vLWNhc2EtTG9jaGVyYmVyLVZFTkVUSUFFLURJRkZVU09SSS1HUkFORElfaGRmbzJ4/drilldown', alt: 'Prima immagine', title: 'Profumatori d\'ambiente', description: 'Scopri la nostra selezione di profumatori d\'ambiente per creare un\'atmosfera unica e rilassante nella tua casa.' },
    { url: 'https://res-console.cloudinary.com/dkwyldbhg/thumbnails/v1/image/upload/v1720620259/SS1icmFuZC1kaS1pbnRlZ3JhdG9yaS1hbGltZW50YXJpLXBpdS12ZW5kdXRpLW5lbGxlLWZhcm1hY2llLW9ubGluZS1uZWwtMjAyMF9zZ2djM2s=/drilldown', alt: 'Seconda immagine', title: 'Integratori Alimentari', description: 'Integratori naturali per sostenere la tua salute e il tuo benessere quotidiano.' },
    { url: 'https://res-console.cloudinary.com/dkwyldbhg/thumbnails/v1/image/upload/v1720620333/ZXJiZV9jaGVfY3VyYW5vX3Byb3ByaWV0w6Bfam14aGZm/drilldown', alt: 'Terza immagine', title: 'Erbe Officinali', description: 'Scopri le nostre selezioni di erbe officinali, tisane, the e infusi bio, ideali per ogni momento della giornata.' },
    { url: 'https://res-console.cloudinary.com/dkwyldbhg/thumbnails/v1/image/upload/v1720620002/bF9hcm9tYXRlcmFwaWFfcTI0Y29k/drilldown', alt: 'Quarta immagine', title: 'Oli Essenziali', description: 'Esplora i nostri oli essenziali naturali, perfetti per aromaterapia e trattamenti di bellezza.' },
    { url: 'https://res-console.cloudinary.com/dkwyldbhg/thumbnails/v1/image/upload/v1720620426/Y29zbWV0aWNpLW5hdHVyYWxpLWxpYnJpX3BsamljNQ==/drilldown', alt: 'Quinta immagine', title: 'Cosmesi Naturale', description: '"Esplora la nostra gamma di cosmetici naturali per una bellezza autentica e rispettosa della tua pelle.' }
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
