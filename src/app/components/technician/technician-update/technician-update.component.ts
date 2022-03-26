import { ToastrService } from 'ngx-toastr';
import { Technician } from './../../../models/technician';
import { TechnicianService } from './../../../services/technician.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technician-update',
  templateUrl: './technician-update.component.html',
  styleUrls: ['./technician-update.component.css']
})
export class TechnicianUpdateComponent implements OnInit {

  technician: Technician = {
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
  itin: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, [Validators.email, Validators.required]);
  password: FormControl = new FormControl(null, [Validators.minLength(6), Validators.required]);

  constructor(
    private service: TechnicianService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.technician.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.technician.id).subscribe(answer => {
      answer.profiles = [];
      this.technician = answer;
    });
  }

  update(): void {
      this.service.update(this.technician).subscribe(() => {
        this.toastr.success('Dados atualizados com sucesso!', 'Atualização');
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
    console.log(this.technician.profiles);
    if (this.technician.profiles.includes(profile)) {
      this.technician.profiles.splice(this.technician.profiles.indexOf(profile), 1);
    } else {
      this.technician.profiles.push(profile);
    }
  }

  profileFieldsValidators(): boolean {
    return this.technician.profiles.length  > 0 &&
     this.name.valid && this.email.valid
    && this.itin.valid && this.password.valid;;
  }

}
