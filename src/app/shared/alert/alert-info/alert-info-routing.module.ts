import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertInfoComponent } from './alert-info.components';

const routes: Routes = [
  {
    path: '',
    component: AlertInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertInfoRoutingModule {
}
