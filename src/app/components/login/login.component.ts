import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    email: '',
    password: ''
  } 

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(6));

  constructor(private toast: ToastrService,
              private service: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.service.authenticate(this.credentials).subscribe(answer => {
      this.service.successFullLogin(answer.headers.
        get('Authorization').substring(7));
        this.router.navigate([''])},() => {this.toast.
        error('Usuário e/ou senha inválidos!', 'Login');})
  }

  fieldValidate(): boolean{
    return this.email.valid && this.password.valid;
   } 
}
