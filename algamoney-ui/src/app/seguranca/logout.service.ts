import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import 'rxjs/operator/toPromise';

@Injectable()
export class LogoutService {

  tokenRevokeUrl = 'http://localhost:8080/token/revoke';

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokenRevokeUrl)
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
