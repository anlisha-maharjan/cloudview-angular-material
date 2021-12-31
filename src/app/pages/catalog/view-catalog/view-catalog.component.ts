import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Input,
} from "@angular/core";
import { Catalog } from "app/models/catalog.model";
import { CatalogService } from "app/services/catalog.service";

@Component({
  selector: "cloudview-view-catalog",
  templateUrl: "./view-catalog.component.html",
  styleUrls: ["./view-catalog.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ViewCatalogComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  catalog: Catalog;
  heading: any = "View Catalog";

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.id != undefined) {
      this.catalogService.getById(this.id).subscribe(response => {
        this.catalog = response.data;
      });
    }
  }

}
