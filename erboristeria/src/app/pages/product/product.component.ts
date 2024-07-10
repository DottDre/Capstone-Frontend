
import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { ProductService } from '../product.service';
import { CategoriesService } from '../categories.service';
import { Icategory } from '../../models/icategory';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModalComponent } from '../../category-modal/category-modal.component';
import { ProductModalComponent } from '../../product-modal/product-modal.component';
import { ProductEditModalComponent } from '../../product-edit-modal/product-edit-modal.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products: Iproduct[] = [];
  newProduct: Partial<Iproduct> = {};
  newCategory: Partial<Icategory> = {};
  categories: Icategory[] = [];
  ImageFile: File | null = null;
  editingProduct: Iproduct | null = null;
  private subscriptions: Subscription = new Subscription();


  constructor(
    private prodSvc: ProductService,
    private catSvc: CategoriesService,
    private modalService: NgbModal,
    private cartSvc:CartService
  ) {}

  ngOnInit() {
    const productSub = this.prodSvc.getAll().subscribe({
      next: (products: Iproduct[]) => {
        this.products = products;
        console.log('Prodotti:', this.products);
      },
      error: (error) => {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    });

    this.subscriptions.add(productSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadCategories() {
    const categorySub = this.catSvc.getAll().subscribe({
      next: (categories: Icategory[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Errore nel caricamento delle categorie', error);
      }
    });

    this.subscriptions.add(categorySub);
  }

  openProductModal() {
    const modalRef = this.modalService.open(ProductModalComponent);
    modalRef.componentInstance.newProduct = this.newProduct;

    modalRef.result.then((result: Iproduct | undefined) => {
      if (result) {
        this.products.push(result);
      }
    }).catch(error => {
      console.error('Modal dismissed with error:', error);
    });
  }

  openCategoryModal() {
    const modalRef = this.modalService.open(CategoryModalComponent);
    modalRef.result.then(
      (result) => {
        console.log('Modale chiuso con risultato:', result);
        this.loadCategories();
      },
      (reason) => {
        console.log('Modale chiuso con motivo:', reason);
      }
    );
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.ImageFile = file;
    }
  }

  uploadImage(): void {
    if (this.ImageFile) {
      const uploadImageSub = this.prodSvc.uploadImageForProduct(this.ImageFile).subscribe({
        next: (response) => {
          console.log('Immagine caricata con successo:', response);
        },
        error: (error) => {
          console.error('Errore durante il caricamento dell\'immagine:', error);
        }
      });

      this.subscriptions.add(uploadImageSub);
    }
  }

  openEditModal(product: Iproduct) {
    const modalRef = this.modalService.open(ProductEditModalComponent, { size: 'lg' });
    modalRef.componentInstance.isNewProduct = false;
    modalRef.componentInstance.product = { ...product }; // Passa una copia del prodotto

    modalRef.result.then(
      (result: Iproduct | undefined) => {
        if (result) {
          // Aggiorna la lista dei prodotti o gestisci il risultato
          const index = this.products.findIndex(p => p.id === result.id);
          if (index !== -1) {
            this.products[index] = result; // Aggiorna il prodotto nella lista
          }
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  deleteProduct(id: number) {
    const deleteProductSub = this.prodSvc.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
        this.subscriptions.add(deleteProductSub);
        this.refreshProducts()
      },
      error: (error) => {
        console.error('Errore nella cancellazione del prodotto', error);
      }
    });


  }

  refreshProducts() {
    const refreshProductsSub = this.prodSvc.getAll().subscribe({
      next: (products: Iproduct[]) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    });

    this.subscriptions.add(refreshProductsSub);
  }
  addToCart(product: Iproduct) {
    this.cartSvc.addToCart(product);
    console.log('Prodotto aggiunto al carrello:', product);
  }
}
