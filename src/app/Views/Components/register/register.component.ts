import { Component, OnDestroy, OnInit} from '@angular/core';
import { AccountService } from '../../../Core/Services/Account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../Core/Interfaces/IUser';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  constructor(private _accountService:AccountService ,
    private _router :Router) { }

errMsg:string = '';
registersubscribe:Subscription= new Subscription();

  registerForm:FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
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
