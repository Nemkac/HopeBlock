import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from '../../wallet.service';
import { CampaignsService } from './services/campaigns.service';
import { Campaign } from '../../core/models/campaing';
import { HttpErrorResponse } from '@angular/common/http';


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
    this.campaignService.getCampaigns().subscribe(
      (resposne: Campaign[]) => {
        this.campaigns = resposne;
        console.log("Fetched: ", this.campaigns);
      },
      (error: HttpErrorResponse) => {
        alert(`Error while fetching campaigns: ${error.error}`);
      }
    )
  }

  connect() {
    this.wallet.connectWallet().then(address => {
      if (address) {
        console.log('Povezan sa:', address);
      }
    });
  }

  donate() {
    this.wallet.donateETH(this.eth_address, '0.01')
      .then(tx => alert('Donacija poslata! Tx hash: ' + tx))
      .catch(err => alert('Greška: ' + err.message));
  }
}
