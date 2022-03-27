import { CalledListComponent } from './components/called/called-list/called-list.component';
import { CreateTechnicianComponent } from './components/technician/create-technician/create-technician.component';
import { LoginComponent } from './components/login/login.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RouteguardGuard } from './routeguard/routeguard';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';
import { TechnicianDeleteComponent } from './components/technician/technician-delete/technician-delete.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { CalledCreateComponent } from './components/called/called-create/called-create.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: NavComponent, canActivate: [RouteguardGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'tecnicos', component: TechnicianListComponent },
      { path: 'tecnicos/create', component: CreateTechnicianComponent },
      { path: 'tecnicos/update/:id', component: TechnicianUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TechnicianDeleteComponent }, 

      { path: 'clientes', component: ClientListComponent },
      { path: 'clientes/create', component: CreateClientComponent },
      { path: 'clientes/update/:id', component: ClientUpdateComponent },
      { path: 'clientes/delete/:id', component: ClientDeleteComponent },

      { path: 'chamados', component: CalledListComponent},
      { path: 'chamados/create', component: CalledCreateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
