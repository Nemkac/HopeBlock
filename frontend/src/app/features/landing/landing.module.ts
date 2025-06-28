import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LandingRoutingModule } from "./landing-routing.module";
import { RouterModule } from "@angular/router";
import { CampaingsRoutingModule } from "../campaigns/campaings-routing.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LandingRoutingModule,
        CampaingsRoutingModule
    ]
})
export class LandingModule { }