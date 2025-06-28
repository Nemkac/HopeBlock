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
    private walletService: WalletService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

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
    const dialogRef = this.dialog.open(AmountDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((amount: number) => {
        if (!amount) return of(null);
        return this.walletService.connect$().pipe(
          switchMap(() => this.walletService.donate$(this.campaign.eth_address, amount.toString()))
        );
      }),
      catchError(() => {
        this.snackBar.open('Greška pri slanju uplate.', 'Zatvori', { duration: 5000 });
        return of(null);
      })
    ).subscribe(hash => {
      if (hash) {
        this.snackBar.open('Transakcija uspešno poslata! Hash: ', 'OK', { duration: 5000 });
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
