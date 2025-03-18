import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { SharedModule } from '../../shared/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { generateEventId } from '../../../assets/utils';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-addevents',
  imports: [SharedModule],
  templateUrl: './addevents.component.html',
  styleUrl: './addevents.component.css'
})
export class AddeventsComponent {
  fb = inject(FormBuilder);
  eventForm!: FormGroup;
  submitted : boolean = false
  totalRecords: any;
  edit: boolean = false;
  getUserId: any;
  safeUrl!: SafeResourceUrl;
  locationIframe: any;
  todayDate: string;
  extractedSrc: any;

  constructor(private callApi : DataService,private router : Router,private route : ActivatedRoute,private sanitizer: DomSanitizer){
   this.route.queryParams.subscribe((res:any) => {    
    if(res.userId){
      this.callApi.getEventById(Number(res.userId)).subscribe((res:any) => {
       this.getUserId = res
       this.eventForm.patchValue({
        eventName : this.getUserId.eventName,
         location: this.getUserId.location,
         eventDate: this.getUserId.eventDate,
         price : this.getUserId.price,
         seats : this.getUserId.seats,
         description : this.getUserId.description
       })
       
       this.edit = true
       this.extractedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.getUserId.location);
     })
     
    }
    else{
      this.edit = false
    }
   })
   this.todayDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(){
  this.eventForm = this.fb.group({
    eventName: ['', Validators.required],
    eventDate: ['', Validators.required],
    price: ['', Validators.required],
    seats: ['', Validators.required],
    description: ['', Validators.required],
    location: ['',Validators.required]
  });
  this.callApi.getEvents().subscribe((res:any) =>{
    this.totalRecords = res.length
  })
  }

  updateLocation() {
    const locationValue = this.eventForm.get('location')?.value;
    
    if (locationValue) {
      this.locationIframe = this.sanitizer.bypassSecurityTrustHtml(locationValue);
      const parser = new DOMParser();
      const doc = parser.parseFromString(locationValue, 'text/html');
      const iframe = doc.querySelector('iframe');
  
      if (iframe) {
        this.extractedSrc = iframe.getAttribute('src');
      } else {
        console.warn("No iframe found in the provided HTML");
      }
    }
  }
  

  onAddEmployee(): void {
    this.submitted = true;
  if (this.eventForm.valid){    
    const payload = {
      id: this.totalRecords + 1,
      ...this.eventForm.value,
      location: this.extractedSrc,
    };

    this.callApi.addEvent(payload).subscribe({
      next: (res: any) => {
        this.callApi.showSuccess('Event edited successfully!');
        this.router.navigate(['/events'])
      },
      error: (err) => {
        console.error('Error updating event:', err);
        this.callApi.showError('Something went wrong');
      },
    });
  }  
  }

  editEvent() {
    this.submitted = true;  
    if (this.eventForm.invalid) return;
    const eventId = Number(this.getUserId?.id);
    if (!eventId) {
      this.callApi.showError('Invalid Event ID');
      return;
    }
  
    const payloads = {
      id: this.getUserId.id,
      ...this.eventForm.value,
      location: this.extractedSrc,
    };
    
    this.callApi.updateEvent(eventId, payloads).subscribe({
      next: (res: any) => {
        this.callApi.showSuccess('Event edited successfully!');
        this.router.navigate(['/events'])
      },
      error: (err) => {
        console.error('Error updating event:', err);
        this.callApi.showError('Something went wrong');
      },
    });
  }
  

  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
}
