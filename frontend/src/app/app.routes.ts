import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
    {
        path: 'campaigns',
        loadChildren: () => import('./features/campaigns/campaings.module').then(m => m.CampaingsModule)
    },
];
