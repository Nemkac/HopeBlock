import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignsService } from '../services/campaigns.service';
import { Campaign } from '../../../core/models/campaing';
import { HttpErrorResponse } from '@angular/common/http';
import { WalletService } from '../../../wallet.service';
import { switchMap, catchError, of } from 'rxjs';
import { AmountDialogComponent } from '../components/amount-dialog/amount-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonationTrackerService } from '../../../core/services/donation-tracker.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.css'
})
export class CampaignDetailsComponent implements OnInit {

  campaignId: string | null = null;
  campaign: Campaign | null = null;
  donations: any[] = [];

  constructor(private route: ActivatedRoute,
    private campaignService: CampaignsService,
    private walletService: WalletService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private donationTrackerService: DonationTrackerService) { }

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

        this.getDonations();
      },
      (error: HttpErrorResponse) => {
        console.log("Error while fetching campaign: ", error.error);
      }
    )
  }

  private getDonations() {
    if (this.campaign?.eth_address) {
      this.donationTrackerService.getDonations(this.campaign.eth_address).then(donations => {
        this.donations = donations.map(tx => ({
          from: tx.from,
          amount: ethers.formatEther(tx.value),
          timestamp: new Date(Number(tx.timeStamp) * 1000)
        }));
      });
    }
  }

  donate(): void {
    const dialogRef = this.dialog.open(AmountDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result: { amount: number, save: boolean }) => {
        if (!result?.save || !result.amount) return of(null);
        return this.walletService.connect$().pipe(
          switchMap(() => this.walletService.donate$(this.campaign.eth_address, result.amount.toString()))
        );
      }),
      catchError(() => {
        this.snackBar.open('Greška pri slanju uplate.', 'Zatvori', { duration: 5000 });
        return of(null);
      })
    ).subscribe(hash => {
      if (hash) {
        this.snackBar.open('Transakcija uspešno poslata!', 'OK', { duration: 5000 });
      }
    });
  }

  getProgress(): number {
    const collected = this.getTotalCollected();
    return this.campaign?.goal > 0
      ? Math.min((collected / this.campaign.goal) * 100, 100)
      : 0;
  }

  mockDonors = [
    { name: 'Milan M.', amount: '0.02', time: 'pre 5 minuta' },
    { name: 'Jovana P.', amount: '0.01', time: 'pre 15 minuta' },
    { name: 'Nebojsa V.', amount: '0.05', time: 'pre 1 sat' },
    { name: 'Anonimni', amount: '0.10', time: 'juče' },
  ];

  getTotalCollected(): number {
    if (!this.donations?.length) return 0;

    return this.donations.reduce((sum, tx) => {
      return sum + parseFloat(tx.amount);
    }, 0);
  }

  getAmountLeft(): number {
    const collected = this.getTotalCollected();
    return this.campaign?.goal ? Math.max(this.campaign.goal - collected, 0) : 0;
  }


}
