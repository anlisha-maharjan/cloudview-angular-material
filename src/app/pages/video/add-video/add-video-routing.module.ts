import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AddVideoComponent } from "./add-video.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AddVideoComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AddVideoRoutingModule { }
