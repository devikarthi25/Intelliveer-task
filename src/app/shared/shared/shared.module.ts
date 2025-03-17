// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatMenuModule} from '@angular/material/menu';

const modules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...modules,
    ToastrModule.forRoot({ positionClass: 'toast-top-right' }),
  ],
  exports: [
    ...modules,
    ToastrModule,
    MatMenuModule
  ],
})
export class SharedModule {}
