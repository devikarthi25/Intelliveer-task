import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class DataService {
   private eventsUrl = 'api/events'
   
  constructor(private http: HttpClient,private toastr : ToastrService) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl);
  }

  addEvent(event: any): Observable<any> {    
    return this.http.post<any>(this.eventsUrl, event);
  }

  getEventById(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.eventsUrl}/${eventId}`);
  }

  updateEvent(eventId: number, event: any): Observable<any> {
    return this.http.put<any>(`${this.eventsUrl}/${eventId}`, event);
  }

  deleteEvent(eventId:any): Observable<any> {
   return this.http.delete<any>(`${this.eventsUrl}/${eventId}`)
  }
  
  // toastr
  showSuccess(data:any){
    this.toastr.success(data)
  }

  showError(data:any){
    this.toastr.error(data)
  }
}
