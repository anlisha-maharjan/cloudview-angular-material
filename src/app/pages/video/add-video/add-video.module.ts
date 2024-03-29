
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { VideoService } from "app/services/video.service";
import { AddVideoRoutingModule } from "./add-video-routing.module";
import { AddVideoComponent } from "./add-video.component";
import { QuillModule } from 'ngx-quill';
import {
  DropzoneModule,
  DropzoneConfigInterface,
  DROPZONE_CONFIG,
} from "ngx-dropzone-wrapper";
@NgModule({
  imports: [
    CommonModule,
    AddVideoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,
    QuillModule
  ],
  providers: [AlertService, VideoService],
  declarations: [AddVideoComponent],
  exports: [AddVideoComponent]
})
export class AddVideoModule { }
