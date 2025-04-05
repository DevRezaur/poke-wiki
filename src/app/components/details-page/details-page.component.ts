import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  standalone: false,
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnDestroy {
  pokemon: any;
  subscription: Subscription;

  constructor(private sharedDataService: SharedDataService) {
    this.subscription = this.sharedDataService.data$.subscribe(
      (data) => (this.pokemon = data)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
