import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Iuser } from '../../models/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerData:Partial<Iuser> = {
    username: "john_doe",
    password: "securePassword123",
    firstName: "jhon",
    lastName: "doe",
    email: "john.doe@example.com",
    role: "USER"
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  signUp(){
    this.authSvc.register(this.registerData)
    .subscribe(data => {

      this.router.navigate(['/'])

    })
  }

}
