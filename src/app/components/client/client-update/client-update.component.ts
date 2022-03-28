import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  client: Client = {
    id: '',
    name: '',
    itin: '',
    email: '',
    password: '',
    profiles: []
  }

  name: FormControl = new FormControl(null, [Validators.minLength(3),
  Validators.required, Validators.maxLength(50)]);
  itin: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, [Validators.email, Validators.required]);
  password: FormControl = new FormControl(null, [Validators.minLength(6), Validators.required]);

  constructor(
    private service: ClientService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.client.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client.id).subscribe(answer => {
      answer.profiles = [];
      this.client = answer;
    });
  }

  update(): void {
      this.service.update(this.client).subscribe(() => {
        this.toastr.success('Cliente atualizado com sucesso!', 'Atualização');
        this.router.navigate(['tecnicos']);
      }, ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: { message: string; }) => {
            this.toastr.error(element.message, 'Atualização');
          })
        } else {
          this.toastr.error(ex.error.message, 'Atualização');
        }
      });
    } 
  
  addProfile(profile: any): void {
    if (this.client.profiles.includes(profile)) {
      this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    } else {
      this.client.profiles.push(profile);
    }
  }

  profileFieldsValidators(): boolean {
    return this.client.profiles.length  > 0 &&
     this.name.valid && this.email.valid
    && this.itin.valid && this.password.valid;;
  }

}
