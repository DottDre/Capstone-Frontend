import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ProductEditModalComponent } from './product-edit-modal/product-edit-modal.component';
import { DeleteProductConfirmationComponent } from './delete-product-confirmation/delete-product-confirmation.component';
import { OrderConfirmationModalComponent } from './order-confirmation-modal/order-confirmation-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CategoryModalComponent,
    ProductModalComponent,
    ProductEditModalComponent,
    DeleteProductConfirmationComponent,
    OrderConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
