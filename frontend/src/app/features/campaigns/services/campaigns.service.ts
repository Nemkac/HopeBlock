import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Campaign } from '../../../core/models/campaing';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private apiUrl = `${environment.apiUrl}/campaigns`;

  constructor(private http: HttpClient) { }

  getCampaignById(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/${id}`).pipe(
      switchMap(campaign =>
        this.getDonations(campaign.eth_address).pipe(
          map(donations => {
            const collected = donations.reduce(
              (sum, tx) => sum + parseFloat(ethers.formatEther(tx.value)),
              0
            );
            donations = donations.map(tx => ({
              from: tx.from,
              hash: tx.hash,
              amount: ethers.formatEther(tx.value),
              timestamp: new Date(Number(tx.timeStamp) * 1000)
            }));
            return { ...campaign, donations, collected };
          })
        )
      )
    );
  }

  getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl).pipe(
      switchMap(campaigns => {
        const updatedCampaigns$ = campaigns.map(c =>
          this.getDonations(c.eth_address).pipe(
            map(donations => {
              const collected = donations.reduce(
                (sum, tx) => sum + parseFloat(ethers.formatEther(tx.value)),
                0
              );
              donations = donations.map(tx => ({
                from: tx.from,
                amount: ethers.formatEther(tx.value),
                timestamp: new Date(Number(tx.timeStamp) * 1000)
              }));
              return { ...c, donations, collected };
            })
          )
        );
        return forkJoin(updatedCampaigns$);
      })
    );
  }

  getDonations(address: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/donations/${address}`);
  }

}
