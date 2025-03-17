import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-profile',
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  getUserData: any;
  bookedEvents: any;
  userObj: any;
  Events: any;
  getallEvent: any;
  events: any;
  constructor(){}
  ngOnInit(){
    this.getUserData = sessionStorage.getItem('userData')
    this.userObj = JSON.parse(this.getUserData);
    this.getEvents()
  }

  getEvents(){
    this.Events = localStorage.getItem('BookedEvents') 
    this.bookedEvents = JSON.parse(this.Events)    
  }

  cancelBooking(id:any){    
   this.events = this.bookedEvents.filter((event: any) => event.id !== id);
    localStorage.setItem('BookedEvents', JSON.stringify(this.events));
    this.getEvents()
  }
}
