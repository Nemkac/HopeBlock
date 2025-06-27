import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaingsService } from './campaings/campaings.service';
import { WalletService } from './wallet.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  @Input() eth_address!: string;
  @Input() name!: string;

  constructor(private wallet: WalletService) { }

  connect() {
    this.wallet.connectWallet().then(address => {
      if (address) {
        console.log('Povezan sa:', address);
      }
    });
  }

  donate() {
    this.wallet.donateETH(this.eth_address, '0.01')
      .then(tx => alert('Donacija poslata! Tx hash: ' + tx))
      .catch(err => alert('Greška: ' + err.message));
  }
}
