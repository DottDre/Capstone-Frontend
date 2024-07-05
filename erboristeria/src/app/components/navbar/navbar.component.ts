import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  show:boolean = false
  isUserLoggedIn:boolean = false;

  constructor(
    private AuthSvc:AuthService
  ){}

  ngOnInit(){
    this.AuthSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data
    })
  }
  logout(){
    this.AuthSvc.logout()
  }
}
