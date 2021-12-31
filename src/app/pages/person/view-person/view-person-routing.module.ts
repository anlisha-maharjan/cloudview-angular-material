import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { ViewPersonComponent } from "./view-person.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ViewPersonComponent,
      },
    ]),
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class ViewPersonRoutingModule {}
