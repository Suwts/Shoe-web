import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DetailUser } from '../model/user/detail.model';
import { UserService } from '../service/user.service';
import { TokenService } from '../service/token.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm :FormGroup;
  updateForm: FormGroup;
  detailUser : DetailUser;
  activeHeader : number = 0;
  check: boolean = false;
  constructor(
    private router : Router,
    private fromBuilder : FormBuilder,
    private userService : UserService,
    private tokenService : TokenService,
    public modalService : ModalService,
    private cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.detailUser = this.userService.getDetailUser();
    this.createForm();
    // this.formUpdate();
    this.checkLogin();
  }

  Search() : void{
    this.router.navigate(['/store'], {queryParams : {term:this.searchForm.value.keywords}});
  }
  createForm() : void{
    this.searchForm = this.fromBuilder.group({
      keywords : ['']
    })
    if(this.userService.getDetailUser() != null || this.userService.getDetailUser() != undefined){
      this.updateForm = this.fromBuilder.group({
        full_name : [this.userService.getDetailUser().full_name],
        user_name : [this.userService.getDetailUser().user_name],
        address : [this.userService.getDetailUser().address],
        phone_number:[this.userService.getDetailUser().phone_number],
        sex : [this.userService.getDetailUser().sex]
      })
    }else{
      this.updateForm = this.fromBuilder.group({
        full_name : [''],
        user_name : [''],
        address : [''],
        phone_number:[''],
        sex : ['']
      })
    }
    
  }

  userClick(index : number){
    if(index === 1){
      this.modalService.openModal();

    }
    if(index === 2){
      this.userService.removeDetailUser();
      this.tokenService.removeToken();
      this.detailUser = this.userService.getDetailUser();
      this.router.navigateByUrl('/');
    }
  }
  clickActive(index : number){
    this.activeHeader = index;

  }

  closeModal(){
    this.modalService.closeModal();
  }

  updateModal(){
    const data  : DetailUser ={
      userId : this.userService.getDetailUser().userId,
      full_name : this.updateForm.value.full_name == '' ? this.userService.getDetailUser().full_name : this.updateForm.value.full_name,
      user_name : this.updateForm.value.user_name == '' ? this.userService.getDetailUser().user_name : this.updateForm.value.user_name,
      email : this.userService.getDetailUser().email,
      sex: this.updateForm.value.sex == '' ? this.userService.getDetailUser().sex : this.updateForm.value.sex,
      phone_number: this.updateForm.value.phone_number == '' ? this.userService.getDetailUser().phone_number : this.updateForm.value.phone_number,
      address: this.updateForm.value.address == '' ? this.userService.getDetailUser().address : this.updateForm.value.address,
      active: this.userService.getDetailUser().active,
      role : this.userService.getDetailUser().role
    }
    const userId = this.userService.getDetailUser().userId;
    const token = this.tokenService.getToken();
    this.userService.update(userId, data, token).subscribe({
      next:(request : any) =>{
        alert("Thay đổi thành công");
        this.router.navigate(['/login']);
      },
      complete : ()=>{},
      error :(error: any) =>{
        alert("Có lỗi: " + error);
      }
    })
  }

  checkLogin(){
    if(this.detailUser !== undefined && this.detailUser.role.name === 'ROLE_ADMIN'){
      this.check = true;
    }
  }

  

}
