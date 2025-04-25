import { Routes } from '@angular/router';
import { NotFoundComponent } from './Views/Components/NotFound/NotFound.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './Views/Components/register/register.component';
import { LoginComponent } from './Views/Components/login/login.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './Views/Components/home/home.component';
import { authGuard } from './Core/Guards/auth.guard';

export const routes: Routes = [
{path:'', canActivate:[authGuard], component:BlankLayoutComponent,children:[

{path:'', redirectTo:'home', pathMatch:'full'},
{path:'home', component:HomeComponent, title:'Home'},

]},

{path:'',component:AuthLayoutComponent,children:[
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent , title:'Login' },
  { path: 'register', component: RegisterComponent , title:'Register' },


]},

{ path: '**', component: NotFoundComponent }



];
