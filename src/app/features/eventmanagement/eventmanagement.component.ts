import { Component, inject, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';
import { SharedModule } from '../../shared/shared/shared.module';
ModuleRegistry.registerModules([AllCommunityModule]);
import { defaultColDef } from '../../../assets/utils/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventmanagement',
  imports: [AgGridAngular,SharedModule],
  templateUrl: './eventmanagement.component.html',
  styleUrl: './eventmanagement.component.scss'
})
export class EventmanagementComponent {
  @ViewChild('canvaCloseButtonRef') canvaCloseButtonRef: any;
  userRole = sessionStorage.getItem('role');
  fb = inject(FormBuilder);
  employeeForm!: FormGroup;
  submitted = false;
  gridApi!: GridApi;
  rowData: any[] = [];  
  gridOptions = {
    getRowId: (params: any) => params.data.id,
  };
  constructor(private callApi : DataService,private router : Router){}

  ngOnInit(): void {
    this.getRowData()
  }

  getRowData(){
    this.callApi.getEvents().subscribe((res:any) =>{
      this.rowData = res
    });
  }
  defaultColDef = defaultColDef;

  colDefs: ColDef[] = [
    { "field": "eventName", "headerName": "Event Name", sortable: true, filter: true,minWidth: 150 },
    { "field": "eventDate", "headerName": "Event Date", sortable: true, filter: true, minWidth: 200 },
    { "field": "location", "headerName": "Location", sortable: true, filter: true, minWidth: 150 },
    { "field": "price", "headerName": "Total Price", sortable: true, filter: true, minWidth: 150 },
    { "field": "seats", "headerName": "Booked Seats", sortable: true, filter: true, minWidth: 150 },
    { "field": "description", "headerName": "Description", sortable: true, filter: true, minWidth: 180, flex: 1,
      cellStyle: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } },
    {
      headerName: 'Action',
      suppressNavigable: true,
      'sortable' : false,
      suppressFiltersToolPanel: true,
      suppressHeaderFilterButton: true,
      cellRenderer: (params: any) => {
        if(this.userRole !== 'admin'){
          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.gap = '10px';
          container.style.alignItems = 'center';
          container.style.height= '100%';
        
          // book Button
          const bookButton = document.createElement('i');
          bookButton.classList.add('fa-solid', 'fa-calendar', 'text-green-700');
          bookButton.style.cursor = 'pointer';
          bookButton.title = 'Book';
          bookButton.addEventListener('click', () => {
            this.bookTicket(params.data.id);
          });
          container.appendChild(bookButton);
          return container;
        }
        else{
          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.gap = '10px';
          container.style.alignItems = 'center';
          container.style.height= '100%';
        
          // Delete Button
          const deleteButton = document.createElement('i');
          deleteButton.classList.add('fa-solid', 'fa-trash', 'text-red-500');
          deleteButton.style.cursor = 'pointer';
          deleteButton.title = 'Delete';
          deleteButton.addEventListener('click', () => {
            this.deleteEmployee(params.data.id);
          });
        
          // Edit Button
          const editButton = document.createElement('i');
          editButton.classList.add('fa-solid', 'fa-pen', 'text-warning');
          editButton.style.cursor = 'pointer';
          editButton.title = 'Edit';
          editButton.addEventListener('click', () => {
            this.editEmployee(params.data);
          });
        
          container.appendChild(editButton);
          container.appendChild(deleteButton);
          return container;
        }
      },
      
    },
  ]
  
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.autoSizeAllColumns(); 
  }

  deleteEmployee(id: number): void {
    this.callApi.deleteEvent(id).subscribe({
      next: () => {
        this.callApi.showSuccess('Event deleted!');
        this.rowData = this.rowData.filter((data) => data.id !== id);  
        this.gridApi.applyTransaction({ remove: [{ id }] });
      },
      error: (err) => {
        this.callApi.showError('Something went wrong');
      },
    });
  }
  
  
  

  editEmployee(data: any) {    
    this.router.navigate(
      ['/add-events'],
      { queryParams: { userId: data.id } }
    ); 
  }

  bookTicket(data:any) {    
    this.router.navigate(['/ticket-booking'],
      {queryParams : { userId : data}}
    )
  }

  autoSizeAllColumns() {
    if (this.gridApi) {
      const allColumnIds: string[] = [];
      this.gridApi.getColumnDefs()?.forEach((col: any) => {
        allColumnIds.push(col.field);
      });
      this.gridApi.autoSizeColumns(allColumnIds);
    }
  }
}
