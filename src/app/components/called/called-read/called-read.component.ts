import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Technician } from 'src/app/models/technician';
import { Client } from 'src/app/models/client';
import { CalledService } from 'src/app/services/called.service';
import { Called } from 'src/app/models/called';

@Component({
  selector: 'app-called-read',
  templateUrl: './called-read.component.html',
  styleUrls: ['./called-read.component.css']
})
export class CalledReadComponent implements OnInit {

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

  constructor(private calledService: CalledService,
              private toastrService: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.called.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.calledService.findById(this.called.id).subscribe(answer => {
      this.called = answer;
    }, ex => {
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
