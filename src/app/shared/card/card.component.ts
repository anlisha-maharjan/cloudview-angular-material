import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'cloudview-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'cloudview-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class cloudviewCard {
}

// noinspection TsLint
@Component({
  selector: 'cloudview-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'cloudview-card-header' },
  template: `
    <div class="cloudview-card-header-title-group">
      <ng-content select="cloudview-card-header-title"></ng-content>
      <ng-content select="cloudview-card-header-sub-title"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="cloudview-card-header-actions"></ng-content>
  `
})
export class cloudviewCardHeader {
}

// noinspection TsLint
@Component({
  selector: 'cloudview-card-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'cloudview-card-content' },
  template: `
    <ng-content></ng-content>`
})
export class cloudviewCardContent {
}

// noinspection TsLint
@Directive({
  selector: 'cloudview-card-header-title',
  host: { 'class': 'cloudview-card-header-title' }
})
export class cloudviewCardHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'cloudview-card-header-sub-title',
  host: { 'class': 'cloudview-card-header-sub-title' }
})
export class cloudviewCardHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'cloudview-card-header-actions',
  host: { 'class': 'cloudview-card-header-actions' }
})
export class cloudviewCardHeaderActions {
}

// noinspection TsLint
@Directive({
  selector: 'cloudview-card-actions',
  host: {
    'class': 'cloudview-card-actions',
    '[class.cloudview-card-actions-align-end]': 'align === "end"',
  }
})
export class cloudviewCardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}
