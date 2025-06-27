import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignsService } from '../services/campaigns.service';
import { Campaign } from '../../../core/models/campaing';
import { HttpErrorResponse } from '@angular/common/http';
import { WalletService } from '../../../wallet.service';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.css'
})
export class CampaignDetailsComponent implements OnInit {

  campaignId: string | null = null;
  campaign: Campaign | null = null;

  constructor(private route: ActivatedRoute,
    private campaignService: CampaignsService,
    private walletService: WalletService
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
      },
      (error: HttpErrorResponse) => {
        console.log("Error while fetching campaign: ", error.error);
      }
    )
  }

  donate(): void {
    this.walletService.connect$().pipe(
      switchMap(() => this.walletService.donate$(this.campaign.eth_address, '0.01')),
      catchError(err => {
        alert('Greška: ' + err.message);
        return of(null);
      })
    ).subscribe(hash => {
      if (hash) {
        alert('Transakcija poslata! Hash: ' + hash);
      }
    });
  }

  getProgress(): number {
    return this.campaign?.goal > 0
      ? Math.min((this.campaign?.collected / this.campaign?.goal) * 100, 100)
      : 0;
  }

  mockDonors = [
    { name: 'Milan M.', amount: '0.02', time: 'pre 5 minuta' },
    { name: 'Jovana P.', amount: '0.01', time: 'pre 15 minuta' },
    { name: 'Nebojsa V.', amount: '0.05', time: 'pre 1 sat' },
    { name: 'Anonimni', amount: '0.10', time: 'juče' },
  ];
}
