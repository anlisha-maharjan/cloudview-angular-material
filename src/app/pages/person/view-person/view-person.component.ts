import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  TemplateRef,
} from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { AlertService } from "app/services/alert.service";
import { Person } from "app/models/person.model";
import { Helpers } from "app/helpers/helpers";
import { PersonService } from "app/services/person.service";
import { NgxGalleryOptions, NgxGalleryImage } from "ngx-gallery";
import "hammerjs";

@Component({
  selector: "cloudview-view-person",
  templateUrl: "./view-person.component.html",
  styleUrls: ["./view-person.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewPersonComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  person: Person;
  personImages: any;
  heading: any = "View Face";
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  totalImages: any;
  activeImageIndex: any = 1;
  constructor(
    private personService: PersonService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onChange(event) {
    this.activeImageIndex = event.index + 1;
  }

  ngAfterViewInit() {
    const _self = this;
    if (this.id != undefined) {
      this.personService.getById(this.id).subscribe((response) => {
        this.person = response.data;
      });
      this.personService.getImages(this.id).subscribe((response) => {
        this.personImages = response.data.images;
        if (
          response.data &&
          response.data.images &&
          response.data.images.length > 0
        ) {
          this.totalImages = response.data.images.length;
          response.data.images.forEach((element) => {
            this.galleryImages.push({
              small: element.url,
              medium: element.url,
              description: element.status,
            });
            this.galleryOptions.push({
              width: "100%",
              height: "80vh",
              lazyLoading: false,
              preview: false,
              thumbnailsRows: 2,
              thumbnailsColumns: 5,
              thumbnailsPercent: 40,
              thumbnailMargin: 2,
              thumbnailsMargin: 2,
              thumbnailsMoveSize: 10,
              thumbnailsArrows: true,
              image: true,
              imageArrows: true,
              imageDescription: true,
              imageActions: [
                {
                  icon: "fa fa-trash",
                  titleText: "Delete",
                  onClick() {
                    _self.deleteImage(element.id);
                  },
                },
              ],
            });
          });
        }
      });
    }
  }

  deleteImage(id) {
    const _self = this;
    this.personService.deleteImage(this.id, id).subscribe(
      (data) => {
        this.snackBar.open("Image Deleted Successfully.", "", {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
        });
        this.personImages = [];
        this.galleryImages = [];
        this.galleryOptions = [];
        this.personService.getImages(this.id).subscribe((response) => {
          this.personImages = response.data.images;
          if (
            response.data &&
            response.data.images &&
            response.data.images.length > 0
          ) {
            this.totalImages = response.data.images.length;
            response.data.images.forEach((element) => {
              this.galleryImages.push({
                small: element.url,
                medium: element.url,
                description: element.status,
              });
              this.galleryOptions.push({
                width: "100%",
                height: "80vh",
                lazyLoading: false,
                preview: false,
                thumbnailsRows: 2,
                thumbnailsColumns: 5,
                thumbnailsPercent: 40,
                thumbnailMargin: 2,
                thumbnailsMargin: 2,
                thumbnailsMoveSize: 10,
                thumbnailsArrows: true,
                image: true,
                imageArrows: true,
                imageDescription: true,
                imageActions: [
                  {
                    icon: "fa fa-trash",
                    titleText: "Delete",
                    onClick() {
                      _self.deleteImage(element.id);
                    },
                  },
                ],
              });
            });
          }
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
