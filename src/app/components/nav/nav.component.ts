import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
  }

 logout(){
   this.authService.logout();
   this.router.navigate(['login']);
   this.toastr.info('Logout realizado com sucesso!', 'Logout', {timeOut: 5000});
 } 
}
