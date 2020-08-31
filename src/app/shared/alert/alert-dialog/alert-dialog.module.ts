import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material-components.module';
import { MatDialogModule } from '@angular/material';
import { AlertDialogComponent } from './alert-dialog.components';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [AlertDialogComponent],
  exports: [AlertDialogComponent]
})
export class AlertDialogModule {
}
