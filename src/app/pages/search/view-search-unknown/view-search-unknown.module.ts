import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { SearchService } from "app/services/search.service";
import { UnknownFaceService } from "app/services/unknown-face.service";
import { ViewSearchUnknownRoutingModule } from "./view-search-unknown-routing.module";
import { ViewSearchUnknownComponent } from "./view-search-unknown.component";
import { CatalogService } from "app/services/catalog.service";
import { PersonService } from "app/services/person.service";
import { AssociatePersonModule } from "../../unknown-face/associate-person/associate-person.module";
import { CreatePersonModule } from "../../unknown-face/create-person/create-person.module";
@NgModule({
  imports: [
    CommonModule,
    ViewSearchUnknownRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AssociatePersonModule,
    CreatePersonModule,
  ],
  providers: [
    AlertService,
    SearchService,
    UnknownFaceService,
    CatalogService,
    PersonService,
  ],
  declarations: [ViewSearchUnknownComponent],
})
export class ViewSearchUnknownModule {}
