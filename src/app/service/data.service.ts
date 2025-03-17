import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersUrl = 'assets/user.json';
  private jsonUrl = 'assets/event.json';
   private eventsUrl = 'api/events'
  private rowDataSubject = new BehaviorSubject<any[]>([]);
  rowData$ = this.rowDataSubject.asObservable();

  constructor(private http: HttpClient,private toastr : ToastrService) {}
  
  login(payload:any): Observable<any> {
    console.log(payload);
    
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        console.log(users,payload);
        const user = users.find(u => u.name === payload.name && u.password === payload.password);        
        if (user) {
          sessionStorage.setItem('authToken', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
          return { success: true, user };
        } else {
          return { success: false, message: 'Invalid email or password' };
        }
      })
    );
  }

  logout() {
    return sessionStorage.removeItem('authToken');
  }

  getColumnDefinitions(): Observable<ColDef[]> {
    return this.http.get<{ colDefs: ColDef[] }>(this.jsonUrl).pipe(
      map((data) => data.colDefs || [])
    );
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl);
  }

  addEvent(event: any): Observable<any> {
    console.log(event);
    
    return this.http.post<any>(this.eventsUrl, event);
  }

  getEventById(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.eventsUrl}/${eventId}`);
  }

  updateEvent(eventId: number, event: any): Observable<any> {
    console.log(eventId,"eventId");
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
