import { Component, Input } from '@angular/core';
import { Campaign } from '../../../../core/models/campaing';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.css'
})
export class CampaignCardComponent {
  @Input() campaign!: Campaign;

  getProgress(): number {
    return this.campaign.goal > 0
      ? Math.min((this.campaign.collected / this.campaign.goal) * 100, 100)
      : 0;
  }
}
