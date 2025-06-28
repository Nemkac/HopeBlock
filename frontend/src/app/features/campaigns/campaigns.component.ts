import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { CampaignsService } from './services/campaigns.service';
import { Campaign } from '../../core/models/campaing';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-campaigns',
  standalone: false,
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    this.campaignService.getAllCampaigns().subscribe(
      (response: Campaign[]) => {
        this.campaigns = response;
        console.log("Campaigns: ", this.campaigns);
      },
      (error) => {
        this.snackbar.open(error.message, 'Ok', { duration: 5000 });
      }
    );
  }
}
