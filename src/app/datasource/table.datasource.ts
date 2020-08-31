import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { DataService } from "app/services/table.data.service";

export class TableDataSource implements DataSource<any> {
  public dataSubject = new BehaviorSubject<any[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }

  loadModel(
    api: string,
    search: any,
    pageIndex: number,
    callback: any = null
  ) {
    this.loadingSubject.next(true);
    this.dataService
      .getAllData(api, search, pageIndex)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(models => {
        this.dataSubject.next(models);
        if (callback) {
          callback(models);
        }
      }
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }
}
