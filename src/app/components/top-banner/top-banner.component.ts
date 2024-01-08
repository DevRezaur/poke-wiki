import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.scss',
})
export class TopBannerComponent {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', [Validators.required]],
    });
  }

  search(): void {
    if (this.searchForm.valid) {
      this.router
        .navigate(['/pokemon-list'], {
          queryParams: { pokemon: this.searchForm.get('searchTerm')?.value },
        })
        .finally(() => {
          this.searchForm.get('searchTerm')?.setValue('');
        });
    }
  }
}
