import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnknownFaceComponent } from './unknown-face.component';

const routes: Routes = [
  {
    path: '',
    component: UnknownFaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnknownFaceRoutingModule {
}
