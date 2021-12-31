import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import { MatDialog, MatSnackBar, MatPaginator } from "@angular/material";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormGroupDirective,
} from "@angular/forms";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
import { SearchService } from "app/services/search.service";
import { PersonService } from "app/services/person.service";
import { CameraService } from "app/services/camera.service";
import { VideoService } from "app/services/video.service";
import * as _moment from "moment";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Subject } from "rxjs/Subject";
import { take, takeUntil } from "rxjs/operators";
const moment = _moment;
interface Source {
  id: string;
  name: string;
}
interface Person {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
}
@Component({
  selector: "cloudview-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit, AfterViewInit {
  dataList: any[];
  cameraList: any[];
  videoList: any[];
  deleteId: number;
  dataId: number;
  allDataSelected: boolean = false;
  dataIds: any = [];
  pageLength = 0;
  pageSize = 20;
  searchForm: FormGroup;
  private personList: Person[];
  private sourceList: Source[];
  /** control for the selected source for multi-selection */
  public sourceMultiCtrl: FormControl = new FormControl();
  public personMultiCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword multi-selection */
  public sourceMultiFilterCtrl: FormControl = new FormControl();
  public personMultiFilterCtrl: FormControl = new FormControl();
  /** list of sources filtered by search keyword for multi-selection */
  public filteredSourcesMulti: ReplaySubject<Source[]> = new ReplaySubject<
    Source[]
  >(1);
  public filteredPersonsMulti: ReplaySubject<Person[]> = new ReplaySubject<
    Person[]
  >(1);
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();
  // Search View Popup
  activePerson = null;
  videoCameraData: any;
  activeVideoCamera: any = null;
  activeVideoCameraDataCount: any;
  activeVideoCameraDataList: any = [];
  activeVideoCameraDataListPageLength = 0;
  activeVideoCameraDataListPageSize = 20;
  videoCameraBarChartAPI: any = [];
  videoCameraBarChart: any = [];
  videoFilesCount: any;
  videoFiles: any[];
  videoFilesPageLength = 0;
  videoFilesPageSize = 20;
  networkDriveData: any;
  activeNetworkDriveFolder: any = null;
  activeFolderDataCount: any;
  activeFolderDataList: any = [];
  activeFolderDataListPageLength = 0;
  activeFolderDataListPageSize = 20;
  networkDrivePieChartAPI: any = [];
  networkDrivePieChart: any = [];
  // Bar Chart
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Camera";
  showYAxisLabel = true;
  yAxisLabel = "Number of visit";
  // Pie chart
  pieView: any[] = [700, 400];
  pieGradient: boolean = true;
  showPieLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild("videoFilesPaginator", { read: MatPaginator })
  videoFilesPaginator: MatPaginator;
  @ViewChild("activeVideoCameraPaginator", { read: MatPaginator })
  activeVideoCameraPaginator: MatPaginator;
  @ViewChild("activeFolderPaginator", { read: MatPaginator })
  activeFolderPaginator: MatPaginator;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private searchService: SearchService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private personService: PersonService,
    private cameraService: CameraService,
    private videoService: VideoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.personService.getAll().subscribe((response) => {
      this.personList = response.data;
      // load the initial person list
      this.filteredPersonsMulti.next(this.personList.slice());
    });
    this.cameraService.getAll().subscribe((response) => {
      this.cameraList = response.data;
      this.videoService.getAll().subscribe((res) => {
        this.videoList = res.data;
        this.sourceList = this.cameraList.concat(this.videoList);
        // load the initial source list
        this.filteredSourcesMulti.next(this.sourceList.slice());
      });
    });
    this.buildSearchForm();

    // listen for search field value changes
    this.sourceMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSourcesMulti();
      });

    this.personMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPersonsMulti();
      });
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      source_id: [""],
      person_id: [""],
      start_time: [""],
      end_time: [""],
    });
  }

  get source_id() {
    return this.searchForm.get("source_id");
  }

  get person_id() {
    return this.searchForm.get("person_id");
  }

  get start_time() {
    return this.searchForm.get("start_time");
  }

  get end_time() {
    return this.searchForm.get("end_time");
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {}

  private filterSourcesMulti() {
    if (!this.sourceList) {
      return;
    }
    // get the search keyword
    let search = this.sourceMultiFilterCtrl.value;
    if (!search) {
      this.filteredSourcesMulti.next(this.sourceList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the source
    this.filteredSourcesMulti.next(
      this.sourceList.filter(
        (item) => item.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  private filterPersonsMulti() {
    if (!this.personList) {
      return;
    }
    // get the search keyword
    let search = this.personMultiFilterCtrl.value;
    if (!search) {
      this.filteredPersonsMulti.next(this.personList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the person
    this.filteredPersonsMulti.next(
      this.personList.filter(
        (item) =>
          item.firstname.toLowerCase().indexOf(search) > -1 ||
          item.lastname.toLowerCase().indexOf(search) > -1
      )
    );
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.searchForm.value;
    getFormValue.start_time = getFormValue.start_time
      ? moment(getFormValue.start_time).utc().format("YYYY-MM-DD HH:mm")
      : "";
    getFormValue.end_time = getFormValue.end_time
      ? moment(getFormValue.end_time).utc().format("YYYY-MM-DD HH:mm")
      : "";
    if (this.searchForm.valid) {
      this.searchService
        .getAll(this.paginator.pageIndex + 1, getFormValue)
        .subscribe(
          (response) => {
            this.dataList = response.data;
            this.pageLength = response.meta.total_count;
            this.snackBar.open("Search Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            // formDirective.resetForm();
            // this.searchForm.reset();
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

  selectAll() {
    this.allDataSelected = !this.allDataSelected;
    if (this.allDataSelected) {
      this.dataList.forEach((element) => {
        if (this.dataIds.includes(element.id)) {
        } else {
          this.dataIds.push(element.id);
        }
      });
    } else {
      this.dataIds = [];
    }
  }

  selectData(item) {
    if (this.dataIds.includes(item.id)) {
      this.dataIds = this.dataIds.filter((x) => x !== item.id);
    } else {
      this.dataIds.push(item.id);
    }
  }

  onPageChange(event) {
    const getFormValue = this.searchForm.value;
    getFormValue.start_time = getFormValue.start_time
      ? moment(getFormValue.start_time).utc().format("YYYY-MM-DD HH:mm")
      : "";
    getFormValue.end_time = getFormValue.end_time
      ? moment(getFormValue.end_time).utc().format("YYYY-MM-DD HH:mm")
      : "";
    if (this.searchForm.valid) {
      this.searchService
        .getAll(this.paginator.pageIndex + 1, getFormValue)
        .subscribe(
          (response) => {
            this.dataList = response.data;
            this.pageLength = response.meta.total_count;
            this.snackBar.open("Search Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            // formDirective.resetForm();
            // this.searchForm.reset();
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

  onVideoFilesPageChange(event) {
    this.getVideoFilesList();
  }

  getVideoFilesList() {
    this.searchService
      .getSearchPeopleByVideoFiles(
        this.activePerson.person_id,
        this.videoFilesPaginator ? this.videoFilesPaginator.pageIndex + 1 : 1
      )
      .subscribe(
        (response) => {
          this.videoFilesCount = response.data.count;
          this.videoFiles = response.data.videos;
          // this.videoFilesPageLength = response.meta.total_count;
          this.videoFilesPageLength = 4;
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

  openViewModal(templateRef: TemplateRef<any>, item) {
    this.activePerson = item;
    this.getVideoFilesList();
    this.searchService.getSearchPeopleByVideoCameras(item.person_id).subscribe(
      (response) => {
        this.videoCameraData = response.data;
        this.videoCameraBarChartAPI = response.data.cameras;
        // let barData = response.data.cameras;
        let barData = [
          {
            camera_id: "1234567890",
            camera_name: "Camera 1",
            visit_count: 10,
          },
          {
            camera_id: "1234567890",
            camera_name: "Camera 2",
            visit_count: 2,
          },
          {
            camera_id: "1234567890",
            camera_name: "Camera 3",
            visit_count: 7,
          },
          {
            camera_id: "1234567890",
            camera_name: "Camera 4",
            visit_count: 1,
          },
          {
            camera_id: "1234567890",
            camera_name: "Camera 5",
            visit_count: 8,
          },
          {
            camera_id: "1234567890",
            camera_name: "Camera 6",
            visit_count: 5,
          },
        ];
        barData.forEach((element) => {
          this.videoCameraBarChart.push({
            name: element.camera_name,
            value: element.visit_count,
            id: element.camera_id,
          });
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
    this.searchService.getSearchPeopleByNetworkDrives(item.person_id).subscribe(
      (response) => {
        this.networkDriveData = response.data;
        this.networkDrivePieChartAPI = response.data.folders;
        // let pieData = response.data.folders;
        let pieData = [
          {
            folder_id: "1234567890",
            count: 10,
            folder_name: "Folder 1",
            network_drive_name: "Drive 1",
          },
          {
            folder_id: "1234567890",
            count: 2,
            folder_name: "Folder 2",
            network_drive_name: "Drive 1",
          },
          {
            folder_id: "1234567890",
            count: 6,
            folder_name: "Folder 3",
            network_drive_name: "Drive 1",
          },
          {
            folder_id: "1234567890",
            count: 2,
            folder_name: "Folder 1",
            network_drive_name: "Drive 2",
          },
          {
            folder_id: "1234567890",
            count: 8,
            folder_name: "Folder 2",
            network_drive_name: "Drive 2",
          },
        ];
        pieData.forEach((element) => {
          this.networkDrivePieChart.push({
            name: element.network_drive_name + ":" + element.folder_name,
            value: element.count,
            id: element.folder_id,
          });
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
    const dialogRef = this.dialog.open(templateRef, {
      width: "150rem",
      panelClass: "default-alert-pop",
    });
  }

  onBarChartSelect(event) {
    let barData = [
      {
        camera_id: "1234567890",
        camera_name: "Camera 1",
        visit_count: 10,
      },
      {
        camera_id: "1234567890",
        camera_name: "Camera 2",
        visit_count: 2,
      },
      {
        camera_id: "1234567890",
        camera_name: "Camera 3",
        visit_count: 7,
      },
      {
        camera_id: "1234567890",
        camera_name: "Camera 4",
        visit_count: 1,
      },
      {
        camera_id: "1234567890",
        camera_name: "Camera 5",
        visit_count: 8,
      },
      {
        camera_id: "1234567890",
        camera_name: "Camera 6",
        visit_count: 5,
      },
    ];
    // this.activeVideoCamera = this.videoCameraBarChartAPI.filter(
    //   (x) => x.camera_name === event.name && x.visit_count === event.value
    // )[0];
    this.activeVideoCamera = barData.filter(
      (x) => x.camera_name === event.name && x.visit_count === event.value
    )[0];
    this.getActiveVideoCameraDataList();
  }

  onActiveVideoCameraPageChange(event) {
    this.getActiveVideoCameraDataList();
  }

  getActiveVideoCameraDataList() {
    this.searchService
      .getVideoCameraDetail(
        this.activePerson.person_id,
        this.activeVideoCamera.camera_id,
        this.activeVideoCameraPaginator
          ? this.activeVideoCameraPaginator.pageIndex + 1
          : 1
      )
      .subscribe(
        (response) => {
          // this.activeVideoCameraDataCount = response.data.count;
          // this.activeVideoCameraDataList = response.data.visit;
          // this.activeVideoCameraDataListPageLength = response.meta.total_count;
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

  onPieChartSelect(event) {
    let pieData = [
      {
        folder_id: "1234567890",
        count: 10,
        folder_name: "Folder 1",
        network_drive_name: "Drive 1",
      },
      {
        folder_id: "1234567890",
        count: 2,
        folder_name: "Folder 2",
        network_drive_name: "Drive 1",
      },
      {
        folder_id: "1234567890",
        count: 6,
        folder_name: "Folder 3",
        network_drive_name: "Drive 1",
      },
      {
        folder_id: "1234567890",
        count: 2,
        folder_name: "Folder 1",
        network_drive_name: "Drive 2",
      },
      {
        folder_id: "1234567890",
        count: 8,
        folder_name: "Folder 2",
        network_drive_name: "Drive 2",
      },
    ];
    // this.activeNetworkDriveFolder = this.networkDrivePieChartAPI.filter(
    //   (x) =>
    //     x.folder_name + ":" + x.network_drive_name === event.name &&
    //     x.count === event.value
    // )[0];
    this.activeNetworkDriveFolder = pieData.filter(
      (x) =>
        x.folder_name + ":" + x.network_drive_name === event.name &&
        x.count === event.value
    )[0];
    this.getActiveFolderDataList();
  }

  onActiveFolderPageChange(event) {
    this.getActiveFolderDataList();
  }

  getActiveFolderDataList() {
    this.searchService
      .getNetworkDriveFolderDetail(
        this.activePerson.person_id,
        this.activeNetworkDriveFolder.folder_id,
        this.activeFolderPaginator
          ? this.activeFolderPaginator.pageIndex + 1
          : 1
      )
      .subscribe(
        (response) => {
          // this.activeFolderDataCount = response.data.count;
          // this.activeFolderDataList = response.data;
          // this.activeFolderDataListPageLength = response.meta.total_count;
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
