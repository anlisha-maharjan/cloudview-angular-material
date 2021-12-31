import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { SearchService } from "app/services/search.service";
import { ViewSearchRoutingModule } from "./view-search-routing.module";
import { ViewSearchComponent } from "./view-search.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AssociatePersonModule } from "../../unknown-face/associate-person/associate-person.module";
import { CreatePersonModule } from "../../unknown-face/create-person/create-person.module";
@NgModule({
  imports: [
    CommonModule,
    ViewSearchRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    AssociatePersonModule,
    CreatePersonModule,
  ],
  providers: [AlertService, SearchService],
  declarations: [ViewSearchComponent],
})
export class ViewSearchModule {}
