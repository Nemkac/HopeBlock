import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSpinnerComponent } from './global-spinner/global-spinner.component';



@NgModule({
  declarations: [
    GlobalSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:
    [GlobalSpinnerComponent]
})
export class SharedModule { }
