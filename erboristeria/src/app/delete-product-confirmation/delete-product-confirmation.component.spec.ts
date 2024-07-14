import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductConfirmationComponent } from './delete-product-confirmation.component';

describe('DeleteProductConfirmationComponent', () => {
  let component: DeleteProductConfirmationComponent;
  let fixture: ComponentFixture<DeleteProductConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProductConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProductConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
