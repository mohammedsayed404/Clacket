import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAuthComponent } from "../../Views/Components/nav-auth/nav-auth.component";
import { FooterComponent } from "../../Views/Components/Footer/Footer.component";
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavAuthComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {

}
