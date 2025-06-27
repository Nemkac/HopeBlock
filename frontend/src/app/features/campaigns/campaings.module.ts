import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaingsRoutingModule } from './campaings-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
import { RouterModule } from '@angular/router';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';


@NgModule({
  declarations: [CampaignsComponent, CampaignCardComponent, CampaignDetailsComponent],
  imports: [
    CommonModule,
    CampaingsRoutingModule,
    RouterModule
  ]
})
export class CampaingsModule { }
