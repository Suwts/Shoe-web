import { Component, OnInit } from '@angular/core';
import { ProductSerivce } from '../service/product.service';
import { Product } from '../model/product.model';
import { environment } from 'src/environments/environment';
import { Catetory } from '../model/catetory.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  currentPage : number = 1;
  itemPerPage : number = 9;
  products : Product[] = [];
  catetories : Catetory[] = [];
  pages : number[] = [];
  totalPage : number = 0;
  visiblePage : number[] = [];

  constructor(
    private productService : ProductSerivce,
    private activedRoute : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    const keyword = this.activedRoute.snapshot.queryParams['term'];
    let keywords = keyword;
    if(keyword == undefined){
      keywords = '';
    }
    this.getProduct(keywords, this.currentPage, this.itemPerPage);
    this.getCatetory();
  }
  getProduct(keywords : string , page: number, limit : number){
    this.productService.getProducts(keywords,page, limit).subscribe({
      next: (respone: any) =>{
        respone.products.forEach((product : Product) =>{
          product.url = `${environment.api}/product/images/${product.image}`;
        });
        this.products = respone.products;
        this.totalPage = respone.totalPage;
        this.visiblePage = this.generateVisiablePage(this.currentPage, this.totalPage);
      },
      complete:()=>{},
      error:(error:any) =>{
        alert("Error: "+error)
      }
    })
  }
  onPageChange(page : number){
    this.currentPage = page;
    // this.getProduct(this.currentPage, this.itemPerPage);
  }
  generateVisiablePage(currentPage : number, totalPage : number) : number[]{
    const maxVisiblePage = 5;
    const halfVisiblePage = Math.floor(maxVisiblePage /2);
    
    let startPage = Math.max(currentPage - halfVisiblePage,1);
    let endPage = Math.min(currentPage + maxVisiblePage -1, totalPage);

    if(endPage - startPage + 1 < totalPage){
      startPage = Math.max(endPage - maxVisiblePage +1, 1);

    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  getCatetory(){
    this.productService.getCatetory().subscribe({
      next:(response :any) =>{
        this.catetories = response;
      },
      complete :()=>{},
      error:(error:any) =>{
        alert("Error: "+error)
      }
    })
  }
  productDetail(product : Product){
    this.router.navigate(['/product/detail'], {queryParams : {term: product.name}});
    console.log("-------------product id---------" + product.name);
  }

}
