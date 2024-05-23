import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../model/user/login.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { DetailUser } from '../model/user/detail.model';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  forgotPassForm: FormGroup;
  detailUser? : DetailUser;
  a : DetailUser;

  checkEmail : boolean = false;
  checkPassword : boolean = false;
  constructor(
    private formBuilder:FormBuilder,
    private userService : UserService,
    private router : Router,
    private tokenSerivce:TokenService,
    public modalService : ModalService
  ) { }

  ngOnInit(): void {
    this.createLogin();
    this.emailPassForm();
  }
  createLogin():void{
    const pattenPassword =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*()_+-=])(?=.{8,})/;
    const checkPassword = Validators.pattern(pattenPassword);
    this.loginForm = this.formBuilder.group({
        email : ['', Validators.compose([Validators.email, Validators.required])],
        password : ['', Validators.compose([Validators.required, checkPassword])]
    });
  }
  validatorEmail(){
    this.checkEmail = true;
  }
  validatorPassword(){
    this.checkPassword = true;
  }

  emailPassForm() : void{
    this.forgotPassForm = this.formBuilder.group({
      email: [''],
    })
  }

  login(){
    const formData = this.loginForm.value;
    const data:Login ={
      email : formData.email,
      password : formData.password
    }
    this.userService.login(data).subscribe({
      next:(responst:any) =>{
        const {token} = responst;
        this.tokenSerivce.setToken(token);
        this.userService.detail(token).subscribe({
          next:(responst : any) =>{
              this.detailUser = responst;
              this.userService.saveDetailUser(this.detailUser);
              this.router.navigate(['/']);
          },
          complete : ()=>{},
          error:(error: any) =>{
            console.error("Lỗi: "+error);
          }
        })
      },
      complete:() =>{},
      error:(error:any) =>{
        alert(`Cannot login, error:  ${error.error}` )
      }
    })
  }
  forgotPassword(){
    this.modalService.openModelForgorPassword();
  }
  closeModal(){
    this.modalService.closeModal();
  }
  send(){
    
    this.userService.forgotPassword(this.forgotPassForm.value.email).subscribe({
      next:(response) =>{
        alert("Vui lòng kiểm tra email");
        this.modalService.closeModal();
      },
      complete:()=>{},
      error:(error :any) =>{
        alert("Vui lòng kiểm tra email");
        this.modalService.closeModal();
      }
    })
  }
}
