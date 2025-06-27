import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from '../model/campaing';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaingsService {
  private apiUrl = `${environment.apiUrl}/campaigns`;

  constructor(private http: HttpClient) { }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }

  getCampaignById(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/${id}`);
  }
}
