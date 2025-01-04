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
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

  signUp(){
    this.authSvc.register(this.registerData)
    .subscribe(data => {

      this.router.navigate(['/auth/login'])

    })
  }

}
