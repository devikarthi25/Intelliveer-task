import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router:Router,private callApi : DataService,private toastr : ToastrService){}
  logout() {
    sessionStorage.clear()
    localStorage.clear()
    this.toastr.success('Logout Successfully');
    this.router.navigate(['/login']);
  }
}
