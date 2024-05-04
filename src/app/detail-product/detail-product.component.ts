import { Component, OnInit } from '@angular/core';
import { ProductSerivce } from '../service/product.service';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product : Product;
  quantity : number =1;
  constructor(
    private productService : ProductSerivce,
    private cartService : CartService,
    private activedRoute : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    const productName = (this.activedRoute.snapshot.queryParams['term'])
    this.getDetailProduct(productName);
  }
  getDetailProduct(name : string) : any{
    console.log("-------------------");
    this.productService.getProductDetail(name).subscribe({
      next:(response : any) => {
        this.product = response;

        this.product.url = `${environment.api}/product/images/${this.product.image}`;
      },
      complete:() =>{},
      error:(error: any) =>{
        alert("Error: "+error)
      }
    })
  }

  addCart() : any{
    if(this.product){
      this.cartService.addCart(this.product.productID, this.quantity);
    }else{
      console.error("Không thể thêm vào giỏ hàng");
    }
    
  }

  increaseQuantity():void{
    this.quantity++;
  }
  decreaseQuantity():void{
    if(this.quantity > 1){
      this.quantity--;
    }
  }

}
