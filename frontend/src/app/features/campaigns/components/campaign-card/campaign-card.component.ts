import { Component, Input } from '@angular/core';
import { Campaign } from '../../../../core/models/campaing';
import { WalletService } from '../../../../wallet.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.css'
})
export class CampaignCardComponent {
  @Input() campaign!: Campaign;

  constructor(private walletService: WalletService) {

  }

  getProgress(): number {
    return this.campaign.goal > 0
      ? Math.min((this.campaign.collected / this.campaign.goal) * 100, 100)
      : 0;
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
}
