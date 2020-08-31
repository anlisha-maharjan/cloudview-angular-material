import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { ProfileComponent } from "./profile.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ProfileComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
