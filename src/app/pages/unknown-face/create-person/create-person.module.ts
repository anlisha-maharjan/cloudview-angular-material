import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { UnknownFaceService } from "app/services/unknown-face.service";
import { CreatePersonRoutingModule } from "./create-person-routing.module";
import { CreatePersonComponent } from "./create-person.component";
import { CatalogService } from "app/services/catalog.service";
@NgModule({
  imports: [
    CommonModule,
    CreatePersonRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AlertService, UnknownFaceService, CatalogService],
  declarations: [CreatePersonComponent],
  exports: [CreatePersonComponent],
})
export class CreatePersonModule {}
