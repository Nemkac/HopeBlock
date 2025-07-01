import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class CampaingsModule { }