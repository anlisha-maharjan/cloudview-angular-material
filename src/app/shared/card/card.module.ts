import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  cloudviewCard,
  cloudviewCardActions,
  cloudviewCardContent,
  cloudviewCardHeader,
  cloudviewCardHeaderActions,
  cloudviewCardHeaderSubTitle,
  cloudviewCardHeaderTitle
} from './card.component';

const cardComponents = [
  cloudviewCard,
  cloudviewCardHeader,
  cloudviewCardHeaderTitle,
  cloudviewCardHeaderSubTitle,
  cloudviewCardHeaderActions,
  cloudviewCardContent,
  cloudviewCardActions
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...cardComponents
  ],
  exports: [
    ...cardComponents
  ]
})
export class cloudviewCardModule {
}
