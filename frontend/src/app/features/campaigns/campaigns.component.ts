import { Component, OnInit } from '@angular/core';
import { CampaignsService } from './services/campaigns.service';
import { Campaign } from '../../core/models/campaing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateCampaignDialogComponent } from './components/create-campaign-dialog/create-campaign-dialog.component';
import { WalletService } from '../../wallet.service';
import { firstValueFrom } from 'rxjs';


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
  myCampaign: Campaign | null = null;
  ethAddress: string = '';

  constructor(private campaignService: CampaignsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private walletService: WalletService
  ) { }

  async ngOnInit() {
    await this.walletService.connectWallet();
    this.ethAddress = await this.walletService.getCurrentAddress();
    console.log(this.ethAddress);
    this.getCampaigns();
  }

  getCampaigns() {
    this.loading = true;
    this.campaignService.getAllCampaigns().subscribe(
      (response: Campaign[]) => {
        this.campaigns = response;
        this.filteredCampaigns = this.campaigns;
        this.getMyCampaign();
        this.loading = false;
      },
      (error) => {
        this.snackbar.open(error.message, 'Ok', { duration: 5000 });
        this.loading = false;
      }
    );
  }

  getMyCampaign() {
    const myCampaign = this.filteredCampaigns.find(c => c.eth_address.toLowerCase() === this.ethAddress.toLowerCase());
    if (myCampaign) {
      const index = this.filteredCampaigns.indexOf(myCampaign);
      this.filteredCampaigns.splice(index, 1);
      this.campaigns.splice(index, 1);
      this.myCampaign = myCampaign;
    }
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
