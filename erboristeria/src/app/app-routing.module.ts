import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth',
    loadChildren:
    () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  },
    { path: '', loadChildren:
      () => import('./pages/home/home.module')
      .then(m => m.HomeModule)
    },
    { path: '', loadChildren:
      () => import('./pages/product/product.module')
      .then(m => m.ProductModule)
    },
    { path: '', loadChildren:
      () => import('./pages/order/order.module')
      .then(m => m.OrderModule)
    }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
