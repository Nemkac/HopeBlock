import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { from, Observable, throwError } from 'rxjs';

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
  private readonly ERC20_ABI = [
    'function transfer(address to, uint amount) public returns (bool)',
    'function decimals() view returns (uint8)',
  ];

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

  connect$(): Observable<string> {
    if (!window.ethereum) {
      return throwError(() => new Error('MetaMask not installed.'));
    }

    return from(this.connectWallet() as Promise<string>);
  }

  donate$(to: string, amountInEth: string): Observable<string> {
    if (!this.signer) {
      return throwError(() => new Error('Wallet not connected.'));
    }

    return from(this.donateETH(to, amountInEth));
  }

  async donate(
    tokenType: 'ETH' | 'ERC20',
    to: string,
    amount: string,
    tokenAddress?: string
  ): Promise<string> {
    if (!this.signer) throw new Error('Wallet not connected');

    if (tokenType === 'ETH') {
      const tx = await this.signer.sendTransaction({
        to,
        value: ethers.parseEther(amount)
      });
      return tx.hash;
    }

    if (tokenType === 'ERC20') {
      if (!tokenAddress) throw new Error('Token address is required for ERC20 donation');
      const contract = new ethers.Contract(tokenAddress, this.ERC20_ABI, this.signer);
      const decimals = await contract['decimals']();
      const parsedAmount = ethers.parseUnits(amount, decimals);
      const tx = await contract['transfer'](to, parsedAmount);
      return tx.hash;
    }
    throw new Error('Unsupported token type');
  }

}
