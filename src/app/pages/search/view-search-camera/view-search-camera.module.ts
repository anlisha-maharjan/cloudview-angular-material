import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { SearchService } from "app/services/search.service";
import { ViewSearchCameraRoutingModule } from "./view-search-camera-routing.module";
import { ViewSearchCameraComponent } from "./view-search-camera.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AssociatePersonModule } from "../../unknown-face/associate-person/associate-person.module";
import { CreatePersonModule } from "../../unknown-face/create-person/create-person.module";
@NgModule({
  imports: [
    CommonModule,
    ViewSearchCameraRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    AssociatePersonModule,
    CreatePersonModule,
  ],
  providers: [AlertService, SearchService],
  declarations: [ViewSearchCameraComponent],
})
export class ViewSearchCameraModule {}
