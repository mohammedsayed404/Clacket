import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../Core/Services/Account.service';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../../Core/Interfaces/IUser';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  constructor(private _accountService:AccountService ,
    private _router :Router) { }

  errMsg:string = "";
  isLoading:boolean = false;
  loginsubscribe:Subscription = new Subscription();

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';
    const errors: any = {};

    if (!/[A-Z]/.test(value)) errors.uppercase = true;
    if (!/[a-z]/.test(value)) errors.lowercase = true;
    if (!/[0-9]/.test(value)) errors.digit = true;
    if (!/[^A-Za-z0-9]/.test(value)) errors.special = true;

    return Object.keys(errors).length ? errors : null;
  }
loginForm:FormGroup = new FormGroup({
  email: new FormControl('',[Validators.required , Validators.email]),
  // password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)]),
  password: new FormControl('',[Validators.required,Validators.minLength(6),this.passwordValidator]),
});



Login(loginFormValues:FormGroup):void{

  if(loginFormValues.valid){

    this.isLoading = true;
  this.loginsubscribe =  this._accountService.Login(loginFormValues.value).subscribe({
      next:(response:IUser) =>{
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
