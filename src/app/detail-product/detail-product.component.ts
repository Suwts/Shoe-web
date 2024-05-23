import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductSerivce } from '../service/product.service';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartService } from '../service/cart.service';
import { CommentService } from '../service/comment.service';
import { CommentDTO } from '../model/comment.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { CatetorySerivce } from '../service/catetory.service';
import { CatetoryDTO } from '../model/user/catetory.model';
import { BrandSerivce } from '../service/brand.service';
import { Brand } from '../model/brand.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  commentForm : FormGroup;
  product : Product;
  quantity : number =1;
  comment : CommentDTO[] = [];
  comment1 : CommentDTO[] = [];
  id :  number;
  checkCmt : boolean = false;
  catetory : CatetoryDTO;
  brand : Brand
  constructor(
    private productService : ProductSerivce,
    private cartService : CartService,
    private commentService : CommentService,
    private activedRoute : ActivatedRoute,
    private userService : UserService,
    private catetoryService : CatetorySerivce,
    private brandService : BrandSerivce,
    private router : Router,
    private formBuilder : FormBuilder,
    private cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.activedRoute.snapshot.queryParams['term'])
    this.getDetailProduct(this.id);
    this.getBrand();
    this.getCatetory();
    
    this.commentService.getCmt().subscribe({
      next:(response : any) =>{
        this.comment = response;
        this.comment1 = this.comment.filter((item) => item.product_id === this.id);
      },
      complete:()=>{},
      error:(error: any) =>{
        alert("Có lỗi: "+error);
      }
    })
    this.createForm();
    
  }
  getDetailProduct(id : number) : any{
    this.productService.getProductDetail(id).subscribe({
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
  getBrand(){
    this.brandService.getBrand(this.id).subscribe({
      next:(response) =>{
        this.brand = response;
      },
      complete:()=>{},
      error:(error)=>{
        
      }
    })
  }
  getCatetory(){
    this.catetoryService.getCatetory(this.id).subscribe({
      next:(response) =>{
        this.catetory = response;
      },
      complete:()=>{},
      error:(error)=>{
        
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
  createForm() :void{
    this.commentForm = this.formBuilder.group({
      comment : ['']
    })
  }

  send(){
    const data : CommentDTO={
      note : this.commentForm.value.comment,
      user_id: this.userService.getDetailUser().userId,
      product_id: this.id,
      user_name : '',
      createtime : ''
    }
      this.commentService.createCmt(data).subscribe({
        next:(response : any) =>{
            this.checkCmt = true;
        },
        complete:()=>{
          this.commentService.getCmt().subscribe({
            next:(response : any) =>{
              this.comment = response;
              this.comment1 = this.comment.filter((item) => item.product_id === this.id);
            },
            complete:()=>{
              this.cdRef.detectChanges();

            },
            error:(error: any) =>{
              alert("Có lỗi: "+error);
            }
          })
        },
        error:(error:any) =>{
          alert("Có lỗi: " + error);
        }
      })
  }

}
