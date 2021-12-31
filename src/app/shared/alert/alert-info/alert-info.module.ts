import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material-components.module';
import { MatDialogModule } from '@angular/material';
import { AlertInfoComponent } from './alert-info.components';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [AlertInfoComponent],
  exports: [AlertInfoComponent]
})
export class AlertInfoModule {
}
