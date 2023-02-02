import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/dashboard/welcome/welcome.component';
import { AuthorizeComponent } from './pages/authorize/authorize.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserComponent } from './pages/dashboard/user-manament/user/user.component';
import { OrderComponent } from './pages/dashboard/order-manament/order/order.component';
import { CategoryComponent } from './pages/dashboard/productmanagement/category/category.component';
import { BrandComponent } from './pages/dashboard/productmanagement/brand/brand.component';
import { ProductComponent } from './pages/dashboard/productmanagement/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: AuthorizeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'product-manage',
        children: [
          {
            path: 'product',
            component: ProductComponent,
          },
          {
            path: 'category',
            component: CategoryComponent,
          },
          {
            path: 'brand',
            component: BrandComponent,
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
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
