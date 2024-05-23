import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DetailUser } from '../model/user/detail.model';
import { UserService } from '../service/user.service';
import { User } from '../model/user/user.model';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  currentPage : number = 1;
  itemPerPage : number = 9;
  user : User[] = [];
  pages : number[] = [];
  totalPage : number = 0;
  visiblePage : number[] = [];
  constructor(
    private userService : UserService,
    private tokenService : TokenService,
    private cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUser(this.currentPage, this.itemPerPage);
  }
  getUser(page: number, limit : number){
    this.userService.getAll(page, limit).subscribe({
      next: (respone: any) =>{
        this.user = respone.users;
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
  deleteUser(userID : number){
    const token = this.tokenService.getToken();
    this.userService.deleteUser(userID, token).subscribe({
      next:(response) =>{
        alert("Cập nhật thành công");
      },
      complete:()=>{
        this.getUser(this.currentPage, this.itemPerPage);
        this.cdRef.detectChanges();
      },
      error:(error) =>{
        alert("Có lỗi " + error);
      }
    })
  }

}
