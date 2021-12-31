import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { UnknownFaceService } from "app/services/unknown-face.service";
import { AssociatePersonRoutingModule } from "./associate-person-routing.module";
import { AssociatePersonComponent } from "./associate-person.component";
import { PersonService } from "app/services/person.service";
@NgModule({
  imports: [
    CommonModule,
    AssociatePersonRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AlertService, UnknownFaceService,PersonService],
  declarations: [AssociatePersonComponent],
  exports: [AssociatePersonComponent],
})
export class AssociatePersonModule {}
