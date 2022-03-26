import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  client: Client = {
    id: '',
    name: '',
    itin: '',
    email: '',
    password: '',
    profiles: [],
    creationDate: ''
  }

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

  delete(): void {
      this.service.delete(this.client).subscribe(() => {
        this.toastr.success('Cliente deletado com sucesso!', 'Exclusão');
        this.router.navigate(['tecnicos']);
      }, ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: { message: string; }) => {
            this.toastr.error(element.message, 'Exclusão');
          })
        } else {
          this.toastr.error(ex.error.message, 'Exclusão');
        }
      });
    } 
}
