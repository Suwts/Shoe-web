import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductSerivce } from '../service/product.service';
import { environment } from 'src/environments/environment';
import { TokenService } from '../service/token.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../service/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatetorySerivce } from '../service/catetory.service';
import { BrandSerivce } from '../service/brand.service';
import { Catetory } from '../model/catetory.model';
import { Brand } from '../model/brand.model';
import { NewProduct } from '../model/newProduct.model';
import { Image } from '../model/image.model';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color,Label } from 'ng2-charts';
import { OrderService } from '../service/order.service';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  updateForm  : FormGroup
  currentPage : number = 1;
  itemPerPage : number = 9;
  products : Product[] = [];
  pages : number[] = [];
  totalPage : number = 0;
  visiblePage : number[] = [];
  keyword : string ='';
  totalMoney : number = 0;
  type : string;
  checkId : number;
  productByID: Product; 
  catetories : Catetory[] = [];
  brands : Brand[] = [];
  chart : any;
  a : number[] = [];
  // selectCatetory : Catetory;
  // selectBrand : Brand;
  constructor(
    private productService : ProductSerivce,
    private tokenService : TokenService,
    public modalService : ModalService,
    private catetoryService : CatetorySerivce,
    private brandService : BrandSerivce,
    private orderService : OrderService,
    private formBuilder : FormBuilder,
    private cdRef : ChangeDetectorRef,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getRevenue();
    this.getProduct(this.keyword,this.currentPage, this.itemPerPage);
    // this.createForm();
    this.getAllCatetory();
    this.getAllBrand();
    
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
      complete:()=>{
        for(const item of this.products){
          this.totalMoney += (item.price * item.number_buy);
        }
        window.scroll(0,0);
      },
      error:(error:any) =>{
        alert("Error: "+error)
      }
    })
  }


  onPageChange(page : number){
    this.currentPage = page;
    // this.getProduct(this.currentPage, this.itemPerPage);
    this.router.navigate(['/product-management'], {queryParams:{page : page}})
    // this.currentPage = parseInt(this.activedRoute.snapshot.queryParams['page'])
    
    // window.scrollTo(0, 0);
    this.getProduct("",this.currentPage, this.itemPerPage);
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
  delete(id : number){
    const token = this.tokenService.getToken();
    this.productService.deleteProduct(id, token).subscribe({
      next:(response) =>{
        alert("Cập nhật thành công");
      },
      complete:()=>{
        this.getProduct(this.keyword,this.currentPage, this.itemPerPage);
        this.cdRef.detectChanges();
      },
      error:(error) =>{
        alert("Có lỗi " + error);
      }
    })
  }
  productClickEdit(index:number, id : number){
    if(index == 1){
      this.createProductForm();
      this.modalService.openModalProduct();
      this.type = "add";

    }
    if(index == 2){
      this.modalService.openModalProduct();
      this.checkId = id;
      this.type = "edit";
      this.getDetailProduct(id);
    }
    console.log("--------" + this.type);
  }
  createProductForm():void{
    this.updateForm = this.formBuilder.group({
      name :['test'],
      price:['12'],
      description:['bac'],
      size:['12'],
      number_input:['100'],
      selectCatetory:[''],
      selectBrand:['']
    })
  }
  getDetailProduct(id : number) : any{
    this.productService.getProductDetail(id).subscribe({
      next:(response : any) => {
        this.productByID = response;
        this.productByID.url = `${environment.api}/product/images/${this.productByID.image}`;
        this.updateForm = this.formBuilder.group({
          name :[this.productByID.name, Validators.required],
          price:[this.productByID.price, Validators.required],
          description:[this.productByID.description],
          size:[this.productByID.size],
          number_input:[this.productByID.number_input, Validators.required],
          number_buy:[this.productByID.number_buy],
          selectCatetory:[''],
          selectBrand:[''],
          image:['']
          // catetoryID:[this.productByID.catetoryID],
          // brandID :[this.productByID.brandID]

        })
      },
      complete:() =>{},
      error:(error: any) =>{
        alert("Error: "+error)
      }
    })
  }

  getAllCatetory(){
    this.catetoryService.getAllCatetory().subscribe({
      next:(response : Catetory[])=>{
        this.catetories = response;
      },

      complete:()=>{},
      error:()=>{}
    })
  }

  getAllBrand(){
    this.brandService.getBrandAll().subscribe({
      next:(response : Brand[])=>{
        this.brands = response;

      },
      complete:()=>{},
      error:()=>{}
    })
  }

  closeModal(){
    this.modalService.closeModal();
  }

  updateProduct(){
    
    const data : Product = {
      productID : this.productByID.productID,
      name : this.updateForm.value.name == '' ? this.productByID.name : this.updateForm.value.name,
      price : this.updateForm.value.price == '' ? this.productByID.price : this.updateForm.value.price,
      discount : this.productByID.discount,
      description : this.updateForm.value.description == '' ? this.productByID.description : this.updateForm.value.description,
      image : this.productByID.image,
      catetory_id :this.updateForm.value.selectCatetory == '' ?  this.productByID.catetory_id : this.updateForm.value.selectCatetory,
      brand_id : this.updateForm.value.selectBrand == '' ?  this.productByID.brand_id : this.updateForm.value.selectBrand,
      url : `${environment.api}/product/images/${this.productByID.image}`,
      size : this.updateForm.value.size == '' ? this.productByID.size : this.updateForm.value.size,
      number_input: this.updateForm.value.number_input == '' ? this.productByID.number_input : this.updateForm.value.number_input,
      number_buy : this.updateForm.value.number_buy == '' ? this.productByID.number_buy : this.updateForm.value.number_buy,
      active : this.productByID.active,
    }
    const token = this.tokenService.getToken();
    
    this.productService.updateProduct(this.checkId, data, token).subscribe({
      next:(response) =>{
        const data1 : Image={
          image:this.updateForm.value.image,
        }
        
        this.productService.createImage(data.productID, data1, token).subscribe({
          next:(response: any)=>{
            console.log("----image---" + response.image);
            alert("Cập nhật thành công");
          },
          error:(error : any) =>{}
        })
        
        this.modalService.closeModal();
      },
      complete:()=>{
        this.getProduct(this.keyword,this.currentPage, this.itemPerPage);
        this.cdRef.detectChanges();
      },
      error:(error : any)=>{
        alert("Không thể cập nhật");
      }
    })
    
  }
  createProduct(){
    const data : NewProduct={
      name : this.updateForm.value.name,
      price : this.updateForm.value.price,
      discount : 0,
      description : this.updateForm.value.description,
      catetory_id :this.updateForm.value.selectCatetory,
      brand_id : this.updateForm.value.selectBrand ,
      size : this.updateForm.value.size,
      number_input: this.updateForm.value.number_input,
    }
    const token = this.tokenService.getToken();
    this.productService.creaetProduct(data, token).subscribe({
      next:(response: any) =>{
        alert("Thêm mới thành công");
      },
      error:(error : any) =>{
        alert("Có lỗi: "+ error.error);
      }
    })
  }

  getRevenue(){
    const token = this.tokenService.getToken();
    for(let month=1; month <= 12; month++){
      this.orderService.getRevenue(2024, month,token).subscribe({
        next:(response : number) =>{  
          if(response == null){
            response = 0;
          }
          this.a.push(response);
        },
        error:(error : any) =>{
          alert("Có lỗi");
        }
      })
    }
  }

  public lineChartData: ChartDataSets[] = [
    
    { data: this.a, label: 'Doanh thu' },
    // { data: [57, 50, 75, 87, 43, 46, 37, 48, 67, 56, 70, 50], label: 'Mi' },
  ];
  public lineChartLabels: Label[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
   
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


}
