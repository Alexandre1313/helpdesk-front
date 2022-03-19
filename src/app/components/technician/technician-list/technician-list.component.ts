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

  ELEMENT_DATA: Technician[] = [
    {
      id: 1,
      name: 'Alexandre Cordeiro',
      itin: '000.612.689-84',
      email: 'alexandre.13a@gmail.com',
      password: '181007n&C',
      profiles: ['0'],
      creationDate: '19/03/2022'
    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);
  
  constructor() { }

  ngOnInit(): void {

  }
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
}
