import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { CampaignsService } from './services/campaigns.service';
import { Campaign } from '../../core/models/campaing';


@Component({
  selector: 'app-campaigns',
  standalone: false,
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent implements OnInit {
  @Input() eth_address: string = '0x5D22dB17bAdAf1252eD7Fc235AFDD6f4A67C8Fb2';
  @Input() name!: string;

  campaigns: Campaign[] = [];

  constructor(private wallet: WalletService,
    private campaignService: CampaignsService
  ) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    this.campaignService.getAllCampaigns().subscribe(
      (response: Campaign[]) => {
        this.campaigns = response;
      },
      (error) => {
        alert(`Error while fetching campaigns: ${error.message || error}`);
      }
    );
  }
}
