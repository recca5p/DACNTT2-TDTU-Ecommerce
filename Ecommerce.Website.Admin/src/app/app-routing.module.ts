import { UserComponent } from './pages/user-manament/user/user.component';
import { OrderComponent } from './pages/order-manament/order/order.component';
import { CategoryComponent } from './pages/productmanagement/category/category.component';
import { BrandComponent } from './pages/productmanagement/brand/brand.component';
import { ProductComponent } from './pages/productmanagement/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'product-manage',
    children: [
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'brand',
        component: BrandComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ],
  },
  {
    path: 'order-manage',
    children: [
      {
        path: 'order',
        component: OrderComponent,
      },
    ],
  },
  {
    path: 'user-manage',
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
