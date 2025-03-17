import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared/shared.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [SharedModule,RouterOutlet,HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Event-booking-platform';
  isAuthenticated() {
    return !!sessionStorage.getItem('authToken');
  }
}
