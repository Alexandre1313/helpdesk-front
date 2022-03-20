import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';

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

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.toast.error('Usuário e/ou senha incorretos!', 'Login');
    this.credentials.password = '';
    this.credentials.email = '';
  }

  fieldValidate(): boolean{
    if(this.email.valid && this.password.valid){
      return true;
    }else{
      return false;
    }
  } 
}
