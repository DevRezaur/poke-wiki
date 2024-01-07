import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  constructor() {
    const storedData = localStorage.getItem('sharedData');
    if (storedData) {
      this.dataSubject.next(JSON.parse(storedData));
    }
  }

  sendData(data: any) {
    this.dataSubject.next(data);
    localStorage.setItem('sharedData', JSON.stringify(data));
  }
}
