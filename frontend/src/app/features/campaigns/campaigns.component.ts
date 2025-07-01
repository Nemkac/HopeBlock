import { Component, OnInit } from '@angular/core';
import { CampaignsService } from './services/campaigns.service';
import { Campaign } from '../../core/models/campaing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateCampaignDialogComponent } from './components/create-campaign-dialog/create-campaign-dialog.component';


@Component({
  selector: 'app-campaigns',
  standalone: false,
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    this.campaignService.getAllCampaigns().subscribe(
      (response: Campaign[]) => {
        this.campaigns = response;
      },
      (error) => {
        this.snackbar.open(error.message, 'Ok', { duration: 5000 });
      }
    );
  }

  createNewCampaign() {
    const dialogRef = this.dialog.open(CreateCampaignDialogComponent, { panelClass: 'wide-dialog' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackbar.open('Campaign successfully created!', 'OK', {
          duration: 3000
        });
        this.getCampaigns();
      }
    });
  }
}
