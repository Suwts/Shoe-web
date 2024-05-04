import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Register } from '../model/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  checkEmail : boolean = false;
  checkFullname : boolean = false;
  checkUserName : boolean = false;
  checkSex : boolean = false;
  checkPassword : boolean = false;
  checkRePassword : boolean = false;
  

  constructor(private formBuilder:FormBuilder, private router: Router, private userService : UserService) {

  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm():void{
    const pattenPassword =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*()_+-=])(?=.{8,})/;
    const checkPassword = Validators.pattern(pattenPassword);
    this.registerForm = this.formBuilder.group({
      fullName:['', Validators.required],
      userName : ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      sex : [''],
      password : ['', [Validators.required, checkPassword]],
      rePassword : ['']
    });
  }
  validatorEmail(){
    this.checkEmail = true;
  }
  validatorFullName(){
    this.checkFullname = true;
  }
  validatorUserName(){
    this.checkUserName = true;
  }
  validatorSex(){
    this.checkSex = true;
  }
  validatorPassword(){
    this.checkPassword = true;
  }
  // validatorRePassword(){
  //   this.checkRePassword = true;
  // }
  register(){
    const formData = this.registerForm.value;
    const register: Register = {
      full_name: formData.fullName,
      user_name :formData.userName,
      email : formData.email,
      sex : formData.sex,
      password : formData.password,
      re_password : formData.rePassword
    };
    this.userService.register(register).subscribe({
      next:(respone:any) => {
        this.router.navigate['/login'];
      },
      complete:() => {   
      },
      error: (error:any) => {
        alert(`Cannot register, error:  ${error.error}` )
      }
    });
  }

}
