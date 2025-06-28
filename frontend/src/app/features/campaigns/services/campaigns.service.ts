import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Campaign } from '../../../core/models/campaing';
import { DonationTrackerService } from '../../../core/services/donation-tracker.service';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private apiUrl = `${environment.apiUrl}/campaigns`;

  constructor(private http: HttpClient,
    private donationTrackerService: DonationTrackerService) { }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }

  getCampaignById(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/${id}`);
  }

  getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl).pipe(
      switchMap(campaigns => {
        const updatedCampaigns$ = campaigns.map(c =>
          this.donationTrackerService.getDonations(c.eth_address).then(transactions => {
            const collected = transactions.reduce((sum, tx) => sum + parseFloat(ethers.formatEther(tx.value)), 0);
            return { ...c, collected };
          })
        );
        return forkJoin(updatedCampaigns$);
      })
    );
  }
}
