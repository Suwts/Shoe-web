import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../model/user/login.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup

  checkEmail : boolean = false;
  checkPassword : boolean = false;
  constructor(
    private formBuilder:FormBuilder,
    private userService : UserService,
    private router : Router,
    private tokenSerivce:TokenService
  ) { }

  ngOnInit(): void {
    this.createLogin();
  }
  createLogin():void{
    const pattenPassword =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*()_+-=])(?=.{8,})/;
    const checkPassword = Validators.pattern(pattenPassword);
    this.loginForm = this.formBuilder.group({
        email : [null, Validators.compose([Validators.email, Validators.required])],
        password : [null, Validators.compose([Validators.required, checkPassword])]
    });
  }
  validatorEmail(){
    this.checkEmail = true;
  }
  validatorPassword(){
    this.checkPassword = true;
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
        this.router.navigate['/home'];
      },
      complete:() =>{},
      error:(error:any) =>{
        alert(`Cannot login, error:  ${error.error}` )
      }
    })
  }
}
