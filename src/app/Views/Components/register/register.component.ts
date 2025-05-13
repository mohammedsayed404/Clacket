import { Component, OnDestroy, OnInit} from '@angular/core';
import { AccountService } from '../../../Core/Services/Account.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../Core/Interfaces/IUser';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  constructor(private _accountService:AccountService ,
    private _router :Router) { }

errMsg:string = '';
registersubscribe:Subscription= new Subscription();
  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';
    const errors: any = {};

    if (!/[A-Z]/.test(value)) errors.uppercase = true;
    if (!/[a-z]/.test(value)) errors.lowercase = true;
    if (!/[0-9]/.test(value)) errors.digit = true;
    if (!/[^A-Za-z0-9]/.test(value)) errors.special = true;

    return Object.keys(errors).length ? errors : null;
  }

  registerForm:FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,this.passwordValidator]),
  });



  Register(registerFormValues:FormGroup):void {
    if (this.registerForm.valid) {
          console.log(registerFormValues.value)

      this.registersubscribe = this._accountService.Register(this.registerForm.value).subscribe({
        next: (response:IUser) => {
          console.log(response);
          this._router.navigate(['/login']);
        },
        error: (error:any) => {
          console.log(error);
          this.errMsg = error.error.message;
        }
      });
    }
    else
      this.registerForm.markAllAsTouched();
  }



  ngOnDestroy(): void {
    this.registersubscribe.unsubscribe()
}



}
