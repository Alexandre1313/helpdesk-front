import { CalledService } from './../../../services/called.service';
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
  ELEMENT_DATA: Called[] = []
  FILTERED_DATA: Called[] = []

  displayedColumns: string[] = ['id', 'title', 'nameClient',
  'nameTechnician', 'priority', 'status', 'openingDate', 'actions', 'actions1'];
  dataSource = new MatTableDataSource<Called>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private service: CalledService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(answer => {
      this.ELEMENT_DATA = answer;
      this.dataSource = new MatTableDataSource<Called>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByStatus(status: any): void {
    let list: Called[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status){
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Called>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }

  showAll(): void {
    this.dataSource = new MatTableDataSource<Called>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
