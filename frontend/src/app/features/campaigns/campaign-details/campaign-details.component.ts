import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignsService } from '../services/campaigns.service';
import { Campaign } from '../../../core/models/campaing';
import { HttpErrorResponse } from '@angular/common/http';
import { WalletService } from '../../../core/services/wallet.service';
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
  ethAddress: string = '';
  isMine: boolean = false;

  constructor(private route: ActivatedRoute,
    private campaignService: CampaignsService,
    private walletService: WalletService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.walletService.connectWallet();
    this.ethAddress = await this.walletService.getCurrentAddress();
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
        if (this.campaign.eth_address.toLowerCase() === this.ethAddress.toLowerCase()) {
          this.isMine = true;
        }
      },
      (_error: HttpErrorResponse) => {
        this.snackBar.open('Error while fetching campaign', 'Ok', { duration: 5000 });
      }
    )
  }

  donate(): void {
    const dialogRef = this.dialog.open(AmountDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result: { amount: number, save: boolean, token: any }) => {
        if (!result?.save || !result.amount) return of(null);
        const toAddress = this.campaign!.eth_address;
        return this.walletService.connect$().pipe(
          switchMap(() => this.walletService.donate(
            result.token.tokenType,
            toAddress,
            result.amount.toString(),
            result.token.tokenAddress
          ))
        );
      }),
      catchError(() => {
        this.snackBar.open('Transaction cancelled.', 'Close', { duration: 5000 });
        return of(null);
      })
    ).subscribe(hash => {
      if (hash) {
        this.snackBar.open('Transaction sent successfully.', 'OK', { duration: 5000 });
      }
    });
  }

  getProgress(): number {
    const collected = this.getTotalCollected();
    return this.campaign?.goal > 0
      ? Math.min((collected / this.campaign.goal) * 100, 100)
      : 0;
  }

  getTotalCollected(): number {
    if (!this.campaign?.donations?.length) return 0;

    return this.campaign?.donations.reduce((sum, tx) => {
      return sum + parseFloat(tx.amount);
    }, 0);
  }

  getAmountLeft(): number {
    const collected = this.getTotalCollected();
    return this.campaign?.goal ? Math.max(this.campaign.goal - collected, 0) : 0;
  }
}
