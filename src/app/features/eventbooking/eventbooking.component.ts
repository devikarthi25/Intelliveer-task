import { Component, Input } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventbooking',
  imports: [SharedModule],
  templateUrl: './eventbooking.component.html',
  styleUrl: './eventbooking.component.scss'
})
export class EventbookingComponent {
  getUserdata: any = {};
  safeLocation: SafeResourceUrl = '';
  bookingForm! : FormGroup;
  seatsExceeded = false;
  totlaPrice: any;
  bookedSeats :any[] =[ ]
  Events: any;
  constructor(
    private callApi: DataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router : Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      const eventId = Number(params.userId);
      if (!eventId) return;
      this.callApi.getEventById(eventId).subscribe((res: any) => {
        this.getUserdata = res;
        this.safeLocation = this.sanitizer.bypassSecurityTrustResourceUrl(this.getUserdata.location);
      });
    });

    this.bookingForm = this.fb.group({
      selectedSeats: [null, [Validators.required]]
    });

    this.Events = localStorage.getItem('BookedEvents') 
    this.bookedSeats = JSON.parse(this.Events)
  }

  validateSeats(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
    const currentValue = (event.target as HTMLInputElement).value + inputChar;
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
    if (parseInt(currentValue) > this.getUserdata.seats) {
      event.preventDefault();
    }
  }

  bookTicket(){
   if(this.bookingForm.valid){
    let payload = {
     tickets : this.bookingForm.value,
     ...this.getUserdata
    }
    let newTickets = []
    
    newTickets.push(payload)    
    localStorage.setItem('BookedEvents' , JSON.stringify(newTickets))
    this.callApi.showSuccess('Event Booked successfully')
    this.router.navigate(['/profile'])
   }
  }

  checkSeatLimit() {
    const seatValue = this.bookingForm.get('selectedSeats')?.value;        
    this.totlaPrice = seatValue * this.getUserdata.price
    if (seatValue > this.getUserdata.seats) {
      this.bookingForm.get('selectedSeats')?.setValue(this.getUserdata.seats);
      this.seatsExceeded = true;
    } else {
      this.seatsExceeded = false;
    }
  }
}