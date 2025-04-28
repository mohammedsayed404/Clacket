import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../Core/Services/Account.service';
import { Router } from '@angular/router';
import { IUser } from '../../../Core/Interfaces/IUser';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  constructor(private _accountService:AccountService ,
    private _router :Router) { }

  errMsg:string = "";
  isLoading:boolean = false;
  loginsubscribe:Subscription = new Subscription();

loginForm:FormGroup = new FormGroup({
  email: new FormControl('',[Validators.required , Validators.email]),
  password: new FormControl('',[Validators.required]),
});

Login(loginFormValues:FormGroup):void{
  if(loginFormValues.valid){

    this.isLoading = true;
  this.loginsubscribe =  this._accountService.Login(loginFormValues.value).subscribe({
      next:(response:IUser) =>{
          localStorage.setItem('token',response.token);
          this._router.navigate(['/home']);
      },
      error:(error:any)=>{
        console.log(error);
        this.errMsg = error.error.message

      }
    })

  }
  else
    this.loginForm.markAllAsTouched();


}

  ngOnDestroy(): void {
    this.loginsubscribe.unsubscribe();
  }



}
