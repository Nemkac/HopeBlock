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
  filteredCampaigns: Campaign[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private campaignService: CampaignsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    this.loading = true;
    this.campaignService.getAllCampaigns().subscribe(
      (response: Campaign[]) => {
        this.campaigns = response;
        this.filteredCampaigns = this.campaigns;
        this.loading = false;
      },
      (error) => {
        this.snackbar.open(error.message, 'Ok', { duration: 5000 });
        this.loading = false;
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

  applySearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredCampaigns = this.campaigns;
      return;
    }

    this.filteredCampaigns = this.campaigns.filter(c =>
      c.name?.toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term) ||
      c.eth_address?.toLowerCase().includes(term)
    );
  }
}
