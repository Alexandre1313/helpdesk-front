import { TechnicianService } from './../../../services/technician.service';
import { Technician } from './../../../models/technician';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.css']
})
export class TechnicianListComponent implements OnInit {

  ELEMENT_DATA: Technician[] = []

  displayedColumns: string[] = ['id', 'name', 'itin', 'email', 'actions', 'actions1'];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TechnicianService) { }

  ngOnInit(): void {
    this.findAll();
  }

   findAll(){
    this.service.findAll().subscribe(answer => {
      this.ELEMENT_DATA = answer;
      this.dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
