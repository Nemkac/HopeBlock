import { Component } from '@angular/core';
import { GlobalLoadingService } from '../../core/services/global-loading.service';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.css'
})
export class GlobalSpinnerComponent {
  isLoading = this.loadingService.loading$;
  constructor(private loadingService: GlobalLoadingService) { }

}
