import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { NewComponent } from './new/new.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './home/home.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { AuthGuard } from './AuthGuard/authguard';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuardAdmin } from './AuthGuard/authguard.admin';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'product/detail',
    component: DetailProductComponent
  },
  {
    path: 'introduction',
    component: IntroductionComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: 'confirm-order',
    canActivate: [AuthGuard],
    component : ConfirmOrderComponent
  },
  {
    path: 'user-management',
    canActivate: [AuthGuardAdmin],
    component: UserManagementComponent
  },
  {
    path:'product-management',
    canActivate: [AuthGuardAdmin],
    component:ProductManagementComponent
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
