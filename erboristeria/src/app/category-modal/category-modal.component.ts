import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../pages/categories.service';
import { Icategory } from '../models/icategory';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent {
  newCategory: Partial<Icategory> = {};

  constructor(
    public activeModal: NgbActiveModal,
    private catSvc: CategoriesService
  ) {}

  ngOnInit(): void {}

  addCategory() {
    if (!this.newCategory.name) {
      console.error('Il nome della categoria è richiesto');
      return;
    }

    this.catSvc.create(this.newCategory).subscribe({
      next: () => {
        this.newCategory = {};
        this.activeModal.close('category created');
      },
      error: (error) => {
        console.error('Errore nella creazione della categoria', error);
      }
    });
  }
}
