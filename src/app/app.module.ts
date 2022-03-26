import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import para realizar requisições http
import {HttpClientModule} from '@angular/common/http';

// Import para trabalhar com formulários no Angular
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Imports para componentes do Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

// Componentes do projeto
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { CreateTechnicianComponent } from './components/technician/create-technician/create-technician.component';
import { NgxMaskModule } from 'ngx-mask';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';
import { TechnicianDeleteComponent } from './components/technician/technician-delete/technician-delete.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TechnicianListComponent,
    LoginComponent,
    CreateTechnicianComponent,
    TechnicianUpdateComponent,
    TechnicianDeleteComponent,
    CreateClientComponent,
    ClientListComponent,
    ClientDeleteComponent,
    ClientUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({timeOut: 4000,
      closeButton: true, progressBar: true}),
    NgxMaskModule.forRoot()
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
