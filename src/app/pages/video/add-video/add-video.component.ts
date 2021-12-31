import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  FormControl,
} from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { Video } from "app/models/video.model";
import { VideoService } from "app/services/video.service";
import { NetworkDriveService } from "app/services/network-drive.service";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Subject } from "rxjs/Subject";
import { take, takeUntil } from "rxjs/operators";
import { MatSelect } from "@angular/material";
import {
  DropzoneComponent,
  DropzoneConfigInterface,
} from "ngx-dropzone-wrapper";
import { environment } from "../../../../environments/environment";
interface Network {
  id: string;
  name: string;
}
@Component({
  selector: "cloudview-add-video",
  templateUrl: "./add-video.component.html",
  styleUrls: ["./add-video.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddVideoComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  video: Video;
  videoForm: FormGroup;
  heading: any = "Add Video/Video Folder";
  attachments: any = [];
  config: DropzoneConfigInterface = {
    clickable: true,
    acceptedFiles: ".flv,.mp4,.m3u8,.ts,.3gp,.mov,.avi,.wmv",
    createImageThumbnails: true,
    autoProcessQueue: false,
    url: environment.apiUrl,
    paramName: "video",
    dictDefaultMessage:
      "Drag & Drop files/folder to upload. Only video allowed.",
    dictInvalidFileType: "Invalid File",
    previewTemplate: `
    <div class="dz-preview dz-file-preview default-file-upload__preview">
      <figure>
        <span class="dz-error-mark"><span>✘</span></span>
        <span class="dz-success-mark"><span>✔</span></span>
        <img data-dz-thumbnail />
        <i class="fa fa-file"></i>
      </figure>

      <div class="dz-details">
        <div><span data-dz-name></span></div>
        <div class="text-primary text-extra-small" data-dz-size></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
      </div>

      <a href="#" class="remove" data-dz-remove>
          <i class="fa fa-trash" />
        </a>
    </div>`,
  };
  editVideo = false;
  private networkDriveList: Network[];
  public networkCtrl: FormControl = new FormControl();
  public networkFilterCtrl: FormControl = new FormControl();
  public filteredNetworks: ReplaySubject<Network[]> = new ReplaySubject<
    Network[]
  >(1);
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();
  @ViewChild("singleSelect") singleSelect: MatSelect;
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private videoService: VideoService,
    private networkDriveService: NetworkDriveService
  ) {}

  ngOnInit() {
    this.buildVideoForm();
    this.networkDriveService.getAll().subscribe((response) => {
      this.networkDriveList = response.data;
      this.filteredNetworks.next(this.networkDriveList.slice());
    });
    this.networkFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterNetworks();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {
    if (this.id != undefined) {
      this.editVideo = true;
      this.videoService.getById(this.id).subscribe(
        (response) => {
          this.video = response.data;
          this.buildVideoForm(this.video);
          this.heading = "Edit Video/Video Folder";
        },
        (err) => {
          const error = err.error;
          this.alertService.showMessage(
            "Error",
            Helpers.parseMessage(error.error ? error.error : error.message),
            "dialog",
            ""
          );
        }
      );
    }
  }

  buildVideoForm(val: any = {}) {
    this.videoForm = this.fb.group({
      id: [val.id],
      name: [val.name, [Validators.required]],
      description: [val.description],
      source: [val.source, [Validators.required]],
      network_drive_id: [val.network_drive_id],
    });
  }

  private filterNetworks() {
    if (!this.networkDriveList) {
      return;
    }
    // get the search keyword
    let search = this.networkFilterCtrl.value;
    if (!search) {
      this.filteredNetworks.next(this.networkDriveList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the catalog
    this.filteredNetworks.next(
      this.networkDriveList.filter(
        (item) => item.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  get name() {
    return this.videoForm.get("name");
  }

  get description() {
    return this.videoForm.get("description");
  }

  get source() {
    return this.videoForm.get("source");
  }

  get network_drive_id() {
    return this.videoForm.get("network_drive_id");
  }

  onFileAdded(file) {
    if (file.fullPath) {
      Object.defineProperty(file, "name", {
        writable: true,
        value: file.fullPath,
      });
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const obj = {
        clip: file,
        fileName: file.name,
      };
      this.attachments.push(obj);
    };
  }

  onFileRemove(file) {
    this.attachments = this.attachments.filter((x) => x.fileName !== file.name);
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.videoForm.value;
    if (this.videoForm.valid) {
      if (!getFormValue.id) {
        getFormValue.videos = this.attachments;
        this.videoService.create(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Video Saved Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            formDirective.resetForm();
            this.videoForm.reset();
          },
          (err) => {
            const error = err.error;
            this.alertService.showMessage(
              "Error",
              Helpers.parseMessage(error.error ? error.error : error.message),
              "dialog",
              ""
            );
          }
        );
      } else {
        this.videoService.update(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Video Updated Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
          },
          (err) => {
            const error = err.error;
            this.alertService.showMessage(
              "Error",
              Helpers.parseMessage(error.error ? error.error : error.message),
              "dialog",
              ""
            );
          }
        );
      }
    }
  }
}
