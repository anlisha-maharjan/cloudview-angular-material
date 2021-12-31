import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { UnknownFaceRoutingModule } from "./unknown-face-routing.module";
import { UnknownFaceComponent } from "./unknown-face.component";
import { UnknownFaceService } from "../../services/unknown-face.service";
import { CatalogService } from "app/services/catalog.service";
import { PersonService } from "app/services/person.service";
import { AssociatePersonModule } from "./associate-person/associate-person.module";
import { CreatePersonModule } from "./create-person/create-person.module";
@NgModule({
  imports: [
    CommonModule,
    UnknownFaceRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    AspectRatioModule,
    AssociatePersonModule,
    CreatePersonModule,
  ],
  declarations: [UnknownFaceComponent],
  providers: [UnknownFaceService, AlertService, CatalogService, PersonService],
})
export class UnknownFaceModule {}
