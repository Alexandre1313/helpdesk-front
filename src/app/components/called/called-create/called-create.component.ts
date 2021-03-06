import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Technician } from 'src/app/models/technician';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { TechnicianService } from 'src/app/services/technician.service';
import { CalledService } from 'src/app/services/called.service';
import { Called } from 'src/app/models/called';

@Component({
  selector: 'app-called-create',
  templateUrl: './called-create.component.html',
  styleUrls: ['./called-create.component.css']
})
export class CalledCreateComponent implements OnInit {

  called: Called = {
    priority: '',
    status: '',
    title: '',
    comments: '',
    technician: '',
    client: '',
    nameTechnician: '',
    nameClient: ''
  }

  clients: Client[] = [];
  technicians: Technician[] = [];

  
  title: FormControl = new FormControl(null, [Validators.required]);
  comments: FormControl = new FormControl(null, [Validators.required]);
  client: FormControl = new FormControl(null, [Validators.required]);
  technician: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  priority: FormControl = new FormControl(null, [Validators.required]);

  constructor(private calledService: CalledService,
              private clientService: ClientService,
              private technicianService: TechnicianService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.findAllClients();
    this.findAllTechnicians();
  }

  fieldsValidators(): boolean {
    return this.title.valid && this.comments.valid &&
    this.client.valid && this.technician.valid &&
    this.status.valid && this.priority.valid;
  }

  findAllClients(): void {
    this.clientService.findAll().subscribe(answer => {
      this.clients = answer;
    })
  }

  findAllTechnicians(): void {
    this.technicianService.findAll().subscribe(answer => {
      this.technicians = answer;
    })
  }

  create(): void {
    this.calledService.create(this.called).subscribe(answer => {
      this.toastrService.success('Chamado cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastrService.error(ex.error.error, 'Cadastro');
    })
  }
}
