import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DonationTrackerService {

  private apiKey = 'KEY';
  private baseUrl = 'https://api-sepolia.etherscan.io/api';

  async getDonations(address: string) {
    const url = `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc&apikey=${this.apiKey}`;
    const response = await axios.get(url);
    return response.data.result.filter((tx: any) => tx.to?.toLowerCase() === address.toLowerCase());
  }
}
