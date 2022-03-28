import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-called-update',
  templateUrl: './called-update.component.html',
  styleUrls: ['./called-update.component.css']
})
export class CalledUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.called.id = this.route.snapshot.paramMap.get('id');
    this.findAllClients();
    this.findAllTechnicians();
    this.findById();
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

  findById(): void {
    this.calledService.findById(this.called.id).subscribe(answer => {
      this.called = answer;
    }, ex => {
      this.toastrService.error(ex.error.error, 'Atualização');
    })
  }

  update(): void {
    this.calledService.update(this.called).subscribe(answer => {
      this.toastrService.success('Chamado atualizado com sucesso!', 'Atualização');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex)
      this.toastrService.error(ex.error.error, 'Atualização');
    })
  }

  statusReturn(status: any): string {
    if(status == '0'){
      return 'Aberto';
    }else if(status == '1'){
      return 'Em andamento';
    }else{
      return 'Encerrado';
    }
  }

  priorityReturn(priority: any): string {
    if(priority == '0'){
      return 'Baixa';
    }else if(priority == '1'){
      return 'Média';
    }else{
      return 'Alta';
    }
  }

}
