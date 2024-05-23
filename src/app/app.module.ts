import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MapComponent } from './map/map.component';
import { NewComponent } from './new/new.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StoreComponent } from './store/store.component';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { TokenInterceptors } from './interceptors/token.interceptors';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { ModalComponent } from './modal/modal.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';
import { SuccessComponent } from './confirm-order/success/success.component';
import { ConfirmOrderRoutingModule } from './confirm-order/confirm-order.router';
// import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ContactComponent,
    IntroductionComponent,
    MapComponent,
    NewComponent,
    RegisterComponent,
    LoginComponent,
    StoreComponent,
    DetailProductComponent,
    ConfirmOrderComponent,
    ModalComponent,
    UserManagementComponent,
    ProductManagementComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfirmOrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    NgChartjsModule,
    ChartsModule
    // CanvasJSAngularChartsModule
    // NgChartjsModule.registerPlugin([]),
  ],
  providers: [
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptors,
    //   multi : true,
    // }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
