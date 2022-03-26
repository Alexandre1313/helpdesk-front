import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  client: Client = {
    id: '',
    name: '',
    itin: '',
    email: '',
    password: '',
    profiles: [],
    creationDate: ''
  }

  name: FormControl = new FormControl(null, [Validators.minLength(3),
     Validators.required, Validators.maxLength(50)]);
  itin: FormControl = new FormControl(null,Validators.required);
  email: FormControl = new FormControl(null, [Validators.email, Validators.required]);
  password: FormControl = new FormControl(null, [Validators.minLength(6), Validators.required]);

  constructor(
    private service: ClientService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  fields_validate(): boolean {
    return this.name.valid && this.email.valid
    && this.itin.valid && this.password.valid;
  }

  create(): void {
    this.service.create(this.client).subscribe(() =>{
      this.toastr.success('Cliente cadastrado com sucesso!', 'Cadastro');
    }, ex => {
      console.log(ex);
      if(ex.error.errors){
        ex.error.errors.forEach((element: { message: string; }) => {
          this.toastr.error(element.message, 'Cadastro');
        })
        } else{
          this.toastr.error(ex.error.message, 'Cadastro');
        }})}
      

  addProfile(profile: any): void {
    console.log(this.client.profiles);
    if(this.client.profiles.includes(profile)){
      this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    }else{
      this.client.profiles.push(profile);
    }
  }
}
