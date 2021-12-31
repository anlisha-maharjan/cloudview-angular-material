import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { CreatePersonComponent } from "./create-person.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: CreatePersonComponent,
      },
    ]),
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class CreatePersonRoutingModule {}
