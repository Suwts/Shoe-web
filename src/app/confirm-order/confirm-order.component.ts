import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ProductSerivce } from '../service/product.service';
import { Product } from '../model/product.model';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderDTO } from '../model/order.model';
import { OrderService } from '../service/order.service';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  confirmForm : FormGroup
  cartItems : {product : Product, quantity : number} [] = [];
  totalMoney : number =0;
  totalM : number = 0;
  vat : number = 0;
  checkPayment : boolean = false;
  checkPayment1 : boolean = false;
  vnp_ResponseCode : string;
  constructor(
    private activedRoute : ActivatedRoute,
    private cartService : CartService,
    private productService : ProductSerivce,
    private orderService : OrderService,
    private paymentService : PaymentService,
    private formBuilder : FormBuilder,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.vnp_ResponseCode = this.activatedRoute.snapshot.queryParams['vnp_ResponseCode'];
    console.log("--------" +this.vnp_ResponseCode);
    const productId = Array.from(this.activedRoute.snapshot.queryParams['productId'], Number);

    //Lấy sản phẩm ra 
    const cart = this.cartService.getCart();
    //Lấy danh sách key trong giỏ hàng
    this.productService.getProductByIds(productId).subscribe({
      next : (response) =>{
        this.cartItems = productId.map((productID) =>{
          const product = response.find((p) => p.productID == productID);
          if(product){
            product.url = `${environment.api}/product/images/${product.image}`;
          }
          return {
            product : product!,
            quantity : cart.get(productID)! 
          }
        });

      },
      complete :()=>{
        this.getTotalMoney();
        this.getVAT();
        this.getTotal();
      },
      error:(error:any) =>{
        console.error("Lỗi" + error);
      }
    })
    this.createForm();
    this.checkPayment = false;

  }

  getTotalMoney() : number{
    this.totalMoney = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,0);
    return this.totalMoney;
  }
  getVAT() : number{
    this.vat = this.getTotalMoney() * 0.1;
    return this.vat;
  }
  getTotal() : number{
    const total = this.getTotalMoney();
    const VAT = this.getVAT();
    this.totalM = total + VAT;
    return this.totalM;
  }
  createForm() : void{
    const pattenPhone = /[0-9]{10}/
    const checkPhone = Validators.pattern(pattenPhone);
    this.confirmForm = this.formBuilder.group({
      full_name : ['Vương Linh', Validators.required],
      address : ['Hưng Yên', Validators.required],
      phone_number : ['0987514832', Validators.compose([Validators.required, checkPhone])],
      note :[''],
      shipping_method : ['GHTK'],
      payment : ['COD']
    });
  }
  
  pay(){
    const formData = this.confirmForm.value;
    let orderDTO : OrderDTO ={
      full_name: formData.full_name,
      address: formData.address,
      phone_number: formData.phone_number,
      note: formData.note,
      payment: 'COD',
      shipping_method: 'express',
      total_money: this.getTotal(),
      cart_item: this.cartItems.map(cartItem => ({
        product_id : cartItem.product.productID,
        quantity : cartItem.quantity
      }))
    }

    if(this.confirmForm.valid){
      orderDTO = {
        ...orderDTO,
        ...this.confirmForm.value
      };
    }
    this.orderService.createOrder(orderDTO).subscribe({
      next:(response) => {
        console.log("--------" + response.orderID);
        this.paymentService.getPay(response.orderID).subscribe({
          next:(response : any) =>{
            window.open(response, '_blank');
            this.checkPayment = true;
          },
          complete:()=>{},
          error:(error: any)=>{
            alert("Có lỗi: "+ error.error);
            console.log(error);
          }
        })
      }, 
      complete:() =>{},
      error:(error : any) =>{
        console.error("Lỗi: "+ error);
      }
    })
    

  }

}
