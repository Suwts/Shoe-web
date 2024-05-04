import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { CartService } from '../service/cart.service';
import { ProductSerivce } from '../service/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems : {product : Product, quantity : number}[] = [];
  totalMoney : number = 0;
  constructor(
    private cartService : CartService,
    private productService : ProductSerivce
  ) { }

  ngOnInit(): void {
    //Lấy sản phẩm ra 
    const cart = this.cartService.getCart();

    //Lấy danh sách key trong giỏ hàng
    const productIds = Array.from(cart.keys());
    this.productService.getProductByIds(productIds).subscribe({
      next : (response) =>{
        this.cartItems = productIds.map((productID) =>{
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
      },
      error:(error:any) =>{
        console.error("Lỗi" + error);
      }
    })
  }

  getTotalMoney() : void{
    this.totalMoney = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,0);
  }

}
