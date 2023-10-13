// shared-data.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {
  private loginData: any;

  setLoginData(data: any) {
    this.loginData = data;
  }

  getLoginData() {
    return this.loginData;
  }
}
