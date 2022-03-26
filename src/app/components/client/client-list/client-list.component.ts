import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  ELEMENT_DATA: Client[] = []

  displayedColumns: string[] = ['id', 'name', 'itin', 'email', 'creationDate', 'actions', 'actions1'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClientService) { }

  ngOnInit(): void {
    this.findAll();
  }

   findAll(){
    this.service.findAll().subscribe(answer => {
      this.ELEMENT_DATA = answer;
      this.dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
