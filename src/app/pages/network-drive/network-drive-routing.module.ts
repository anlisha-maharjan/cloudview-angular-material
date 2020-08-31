import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkDriveComponent } from './network-drive.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkDriveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkDriveRoutingModule {
}
