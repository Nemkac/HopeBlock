import { Component, Input } from '@angular/core';
import { Campaign } from '../../../../core/models/campaing';
import { WalletService } from '../../../../wallet.service';
import { catchError, of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmountDialogComponent } from '../amount-dialog/amount-dialog.component';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.css'
})
export class CampaignCardComponent {
  @Input() campaign!: Campaign;

  constructor(private walletService: WalletService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  getProgress(): number {
    return this.campaign.goal > 0
      ? Math.min((this.campaign.collected / this.campaign.goal) * 100, 100)
      : 0;
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
}
