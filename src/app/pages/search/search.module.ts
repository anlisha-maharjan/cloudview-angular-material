import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import { SearchService } from "../../services/search.service";
import { PersonService } from "../../services/person.service";
import { CameraService } from "../../services/camera.service";
import { VideoService } from "../../services/video.service";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    NgxChartsModule,
    AspectRatioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [SearchComponent],
  providers: [
    SearchService,
    AlertService,
    PersonService,
    CameraService,
    VideoService,
  ],
})
export class SearchModule {}
