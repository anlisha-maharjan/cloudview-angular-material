import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { VideoRoutingModule } from "./video-routing.module";
import { VideoComponent } from "./video.component";
import { VideoService } from "../../services/video.service";
import { DataService } from "app/services/table.data.service";
import { AlertService } from "app/services/alert.service";
import { AddVideoModule } from "./add-video/add-video.module";
import { NetworkDriveService } from "app/services/network-drive.service";
import { CarouselModule } from "ngx-owl-carousel-o";
import { AssociatePersonModule } from "../unknown-face/associate-person/associate-person.module";
import { CreatePersonModule } from "../unknown-face/create-person/create-person.module";
@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AddVideoModule,
    AspectRatioModule,
    CarouselModule,
    AssociatePersonModule,
    CreatePersonModule,
  ],
  declarations: [VideoComponent],
  providers: [
    VideoService,
    DataService,
    AlertService,
    NetworkDriveService,
  ],
})
export class VideoModule {}
