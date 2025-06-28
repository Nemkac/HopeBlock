import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './campaigns.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';

const routes: Routes = [
  { path: 'campaigns', component: CampaignsComponent },
  { path: 'campaigns/:id', component: CampaignDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaingsRoutingModule { }
