import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorAlertComponent } from './error-alert.components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ErrorAlertComponent],
  exports: [ErrorAlertComponent]
})
export class ErrorAlertModule {
}
