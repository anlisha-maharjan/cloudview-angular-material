import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AddUserComponent } from "./add-user.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AddUserComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AddUserRoutingModule {}
