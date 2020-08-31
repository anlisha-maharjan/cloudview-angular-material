import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AddPersonComponent } from "./add-person.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AddPersonComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AddPersonRoutingModule { }
