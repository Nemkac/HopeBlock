import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaingsRoutingModule } from './campaings-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
import { RouterModule } from '@angular/router';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { AmountDialogComponent } from './components/amount-dialog/amount-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [CampaignsComponent, CampaignCardComponent, CampaignDetailsComponent, AmountDialogComponent],
  imports: [
    CommonModule,
    CampaingsRoutingModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class CampaingsModule { }
