import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay, from, map, Observable, of, switchMap, toArray } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Campaign } from '../../../core/models/campaing';

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
              (sum, tx) => sum + parseFloat(tx.amount),
              0
            );
            return { ...campaign, donations, collected };
          })
        )
      )
    );
  }

  getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl).pipe(
      switchMap(campaigns =>
        from(campaigns).pipe(
          concatMap((campaign, index) =>
            of(campaign).pipe(
              delay(index * 100),
              switchMap(c =>
                this.getDonations(c.eth_address).pipe(
                  map(donations => {
                    const collected = donations.reduce(
                      (sum, tx) => sum + parseFloat(tx.amount),
                      0
                    );
                    return { ...c, donations, collected };
                  })
                )
              )
            )
          ),
          toArray()
        )
      )
    );
  }

  getDonations(address: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/donations/${address}`);
  }

  createCampaign(campaignData: Partial<Campaign>): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.apiUrl}/create`, campaignData);
  }

  deleteCampaign(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
