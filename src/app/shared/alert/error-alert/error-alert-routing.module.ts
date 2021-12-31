import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorAlertComponent } from './error-alert.components';

const routes: Routes = [
  {
    path: '',
    component: ErrorAlertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorAlertRoutingModule {
}
