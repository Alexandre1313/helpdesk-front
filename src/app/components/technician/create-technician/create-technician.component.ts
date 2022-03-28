import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from './../../../models/technician';
import { TechnicianService } from './../../../services/technician.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-technician',
  templateUrl: './create-technician.component.html',
  styleUrls: ['./create-technician.component.css']
})
export class CreateTechnicianComponent implements OnInit {

  technician: Technician = {
    id: '',
    name: '',
    itin: '',
    email: '',
    password: '',
    profiles: []
  }

  name: FormControl = new FormControl(null, [Validators.minLength(3),
     Validators.required, Validators.maxLength(50)]);
  itin: FormControl = new FormControl(null,Validators.required);
  email: FormControl = new FormControl(null, [Validators.email, Validators.required]);
  password: FormControl = new FormControl(null, [Validators.minLength(6), Validators.required]);

  constructor(
    private service: TechnicianService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  fields_validate(): boolean {
    return this.name.valid && this.email.valid
    && this.itin.valid && this.password.valid;
  }

  create(): void {
    this.service.create(this.technician).subscribe(() =>{
      this.toastr.success('Técnico cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['tecnicos']);
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach((element: { message: string; }) => {
          this.toastr.error(element.message, 'Cadastro');
        })
        } else{
          this.toastr.error(ex.error.message, 'Cadastro');
        }})}
      

  addProfile(profile: any): void {
    console.log(this.technician.profiles);
    if(this.technician.profiles.includes(profile)){
      this.technician.profiles.splice(this.technician.profiles.indexOf(profile), 1);
    }else{
      this.technician.profiles.push(profile);
    }
  }
}
