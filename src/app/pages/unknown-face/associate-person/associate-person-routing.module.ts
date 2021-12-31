import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AssociatePersonComponent } from "./associate-person.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AssociatePersonComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AssociatePersonRoutingModule { }
