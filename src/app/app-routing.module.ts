import { CreateTechnicianComponent } from './components/technician/create-technician/create-technician.component';
import { LoginComponent } from './components/login/login.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RouteguardGuard } from './routeguard/routeguard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: NavComponent, canActivate: [RouteguardGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'tecnicos', component: TechnicianListComponent },
      { path: 'tecnicos/create', component: CreateTechnicianComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
