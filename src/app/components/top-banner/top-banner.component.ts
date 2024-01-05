import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.scss',
})
export class TopBannerComponent {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
    });
  }

  search(): void {
    alert(this.searchForm.get('searchTerm')?.value);
  }
}
