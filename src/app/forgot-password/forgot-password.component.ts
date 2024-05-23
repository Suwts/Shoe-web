import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordDTO } from '../model/user/password.model';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form : FormGroup;

  checkEmail : boolean = false;
  checkPassword : boolean = false;
  constructor(
    private formBuilder:FormBuilder,
    private userService : UserService,
    private tokenService : TokenService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.createLogin();
  }
  createLogin():void{
    const pattenPassword =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*()_+-=])(?=.{8,})/;
    const checkPassword = Validators.pattern(pattenPassword);
    this.form = this.formBuilder.group({
        password : ['', Validators.compose([Validators.required, checkPassword])],
        re_password : ['', Validators.compose([Validators.required, checkPassword])]

    });
  }
  validatorPassword(){
    this.checkPassword = true;
  }

  forgotPassword(){
    const data: PasswordDTO = {
      password : this.form.value.password,
      re_password : this.form.value.re_password
    }
    console.log("--------" + data.re_password);
    const email = this.activatedRoute.snapshot.queryParams['email'];
    this.userService.setPassword(email,data).subscribe({
      next :(response : any) =>{
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
      },
      complete:()=>{},
      error:(error: any)=>{
        this.router.navigate(['/login']);
      }
    })
  }
}
