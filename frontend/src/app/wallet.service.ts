import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  async connectWallet(): Promise<string | null> {
    if (!window.ethereum) {
      alert('MetaMask not installed.');
      return null;
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner();

    return accounts[0];
  }

  async donateETH(toAddress: string, amountInEth: string): Promise<string> {
    if (!this.signer) throw new Error('Wallet not connected');

    const tx = await this.signer.sendTransaction({
      to: toAddress,
      value: ethers.parseEther(amountInEth)
    });

    return tx.hash;
  }

  getCurrentAddress(): Promise<string | null> {
    return this.signer?.getAddress() ?? Promise.resolve(null);
  }
}
