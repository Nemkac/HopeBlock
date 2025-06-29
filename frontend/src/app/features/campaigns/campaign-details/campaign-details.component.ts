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


interface Token {
  name: string;
  tokenType: 'ETH' | 'ERC20';
  tokenAddress?: string;
}

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.css'
})
export class CampaignDetailsComponent implements OnInit {

  campaignId: string | null = null;
  campaign: Campaign | null = null;
  tokens: Token[] = [
    { name: 'Ethereum (ETH)', tokenType: 'ETH' },
    { name: 'USDC (Goerli)', tokenType: 'ERC20', tokenAddress: '0x07865c6e87b9f70255377e024ace6630c1eaa37f' }
  ];

  selectedToken: Token = this.tokens[0];

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
    const toAddress = this.selectedToken.tokenType === 'ETH'
      ? this.campaign!.eth_address
      : this.campaign!.usdc_address;
    dialogRef.afterClosed().pipe(
      switchMap((result: { amount: number, save: boolean }) => {
        if (!result?.save || !result.amount) return of(null);
        return this.walletService.connect$().pipe(
          switchMap(() => this.walletService.donate(
            this.selectedToken.tokenType,
            toAddress,
            result.amount.toString(),
            this.selectedToken.tokenAddress
          ))
        );
      }),
      catchError(() => {
        this.snackBar.open('Error while sending transaction.', 'Clsoe', { duration: 5000 });
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
