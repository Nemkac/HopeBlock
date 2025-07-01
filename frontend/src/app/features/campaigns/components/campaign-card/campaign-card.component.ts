import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from '../../../../core/models/campaing';
import { WalletService } from '../../../../core/services/wallet.service';
import { catchError, of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmountDialogComponent } from '../amount-dialog/amount-dialog.component';
import { CampaignsService } from '../../services/campaigns.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.css'
})
export class CampaignCardComponent {
  @Input() campaign!: Campaign;
  @Input() isMine: boolean = false;
  @Output() deleted = new EventEmitter<string>();

  constructor(private walletService: WalletService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private campaignService: CampaignsService
  ) { }

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

  deleteCampaign() {
    if (!confirm('Are you sure you want to delete this campaign?')) return;

    this.campaignService.deleteCampaign(this.campaign._id).subscribe(
      () => {
        this.deleted.emit(this.campaign._id);
      },
      (_error: HttpErrorResponse) => {
        this.snackBar.open('Error while deleting campaign', 'Ok', { duration: 5000 });
      }
    )
  }
}
