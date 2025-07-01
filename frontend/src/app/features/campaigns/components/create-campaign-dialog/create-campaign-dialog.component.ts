import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ethers } from 'ethers';
import { WalletService } from '../../../../core/services/wallet.service';
import { CampaignsService } from '../../services/campaigns.service';

@Component({
  selector: 'app-create-campaign-dialog',
  templateUrl: './create-campaign-dialog.component.html',
  styleUrl: './create-campaign-dialog.component.css'
})
export class CreateCampaignDialogComponent implements OnInit {

  form!: FormGroup;
  step = 1;
  ethAddress: string | null = null;
  provider: ethers.BrowserProvider | null = null;
  signer: ethers.JsonRpcSigner | null = null;
  showManualInput = false;

  constructor(
    public dialogRef: MatDialogRef<CreateCampaignDialogComponent>,
    private fb: FormBuilder,
    private walletService: WalletService,
    private campaignService: CampaignsService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      goal: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    })
  }

  goToStep2() {
    if (this.form.valid) this.step = 2;
  }

  async connectWallet(): Promise<void> {
    try {
      this.ethAddress = await this.walletService.connectWallet();
    } catch (err) {
      alert('Failed to connect to wallet')
    }
  }

  submit() {
    if (!this.ethAddress) {
      alert('Please connect your wallet or paste the address');
      return;
    }

    const body = {
      ...this.form.value,
      eth_address: this.ethAddress,
      colected: 0,
      is_active: true,
      tags: []
    }

    this.campaignService.createCampaign(body).subscribe({
      next: (createdCampaign) => {
        this.dialogRef.close(createdCampaign);
      },
      error: (err) => {
        console.error('Campaign creation failed', err);
        if (err.status === 409) {
          alert('A campaign with this ETH address already exists!');
        } else {
          alert('Error creating campaign: ' + err.message);
        }
      }
    });
  }

}
