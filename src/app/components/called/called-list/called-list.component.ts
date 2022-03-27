import { Called } from './../../../models/called';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-called-list',
  templateUrl: './called-list.component.html',
  styleUrls: ['./called-list.component.css']
})
export class CalledListComponent implements OnInit {
  ELEMENT_DATA: Called[] = [
    {
      id: 1,
      openingDate: '21/06/2021',
      closingDate: '22/07/2022',
      priority: 'Alta',
      status: 'Em andamento',
      title: 'Chamado Teste',
      comments: 'Estava arramhada na lateral',
      technician: 1,
      client: 7,
      technicianName: 'Alexandre Cordeiro',
      clientName: 'Pedro Malazart'
  }
  ]

  displayedColumns: string[] = ['id', 'title', 'clientName',
  'technicianName', 'priority', 'openingDate',
   'closingDate', 'actions', 'actions1'];
  dataSource = new MatTableDataSource<Called>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor() { }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
