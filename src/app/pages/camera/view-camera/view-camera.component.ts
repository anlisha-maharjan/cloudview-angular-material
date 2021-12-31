import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Input,
} from "@angular/core";
import { Camera } from "app/models/camera.model";
import { CameraService } from "app/services/camera.service";
@Component({
  selector: "cloudview-view-camera",
  templateUrl: "./view-camera.component.html",
  styleUrls: ["./view-camera.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewCameraComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  camera: Camera;
  heading: any = "View Camera";

  constructor(private cameraService: CameraService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.id != undefined) {
      this.cameraService.getById(this.id).subscribe((response) => {
        this.camera = response.data;
      });
    }
  }
}
