import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignsService } from '../services/campaigns.service';
import { Campaign } from '../../../core/models/campaing';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.css'
})
export class CampaignDetailsComponent implements OnInit {

  campaignId: string | null = null;
  campaign: Campaign | null = null;

  constructor(private route: ActivatedRoute,
    private campaignService: CampaignsService
  ) { }

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (idFromRoute) {
      this.campaignId = idFromRoute;
      this.getCampaign();
    }
  }

  getCampaign(): void {
    this.campaignService.getCampaignById(this.campaignId).subscribe(
      (response: Campaign) => {
        this.campaign = response;
        console.log("Campaign: ", this.campaign);
      },
      (error: HttpErrorResponse) => {
        console.log("Error while fetching campaign: ", error.error);
      }
    )
  }
}
