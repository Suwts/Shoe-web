import { Injectable } from "@angular/core";
import { ProductSerivce } from "./product.service";

@Injectable({
    providedIn : 'root'
})
export class CartService{
    private cart: Map<number, number> = new Map(); //Dùng map để lữu trữ giỏ hàng, key là id product, value là số lượng sản phẩm
    constructor(private productService : ProductSerivce){
        const storeCart = localStorage.getItem('cart'); //Khởi tạo để lữu trữ giỏ hàng trong localStorage
        if(storeCart){
            this.cart = new Map(JSON.parse(storeCart));
        }
    }

    addCart(productID: number, quantity: number = 1) : any{
        if(this.cart.has(productID)){
            //Nếu sản phẩm dã có trong giỏ hàng thì tăng quantity
            this.cart.set(productID, this.cart.get(productID)! + quantity);
        }
        else{
            this.cart.set(productID, quantity);
        }
        return this.saveCartToLocalStorage();
    }

    getCart() :Map<number, number>{
        return this.cart;
    }
    
    private saveCartToLocalStorage():void{
        localStorage.setItem('cart',JSON.stringify(Array.from(this.cart.entries())));
    }

}