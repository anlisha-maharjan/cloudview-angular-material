import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertDialogComponent } from './alert-dialog.components';

const routes: Routes = [
  {
    path: '',
    component: AlertDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertDialogRoutingModule {
}
