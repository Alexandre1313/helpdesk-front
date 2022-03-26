import { ToastrService } from 'ngx-toastr';
import { Technician } from './../../../models/technician';
import { TechnicianService } from './../../../services/technician.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technician-delete',
  templateUrl: './technician-delete.component.html',
  styleUrls: ['./technician-delete.component.css']
})
export class TechnicianDeleteComponent implements OnInit {

  technician: Technician = {
    id: '',
    name: '',
    itin: '',
    email: '',
    password: '',
    profiles: [],
    creationDate: ''
  }

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

  delete(): void {
      this.service.delete(this.technician).subscribe(() => {
        this.toastr.success('Técnico deletado com sucesso!', 'Exclusão');
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
