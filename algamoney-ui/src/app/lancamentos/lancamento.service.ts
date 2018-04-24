import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/operator/toPromise';

@Injectable()
export class LancamentoService {

  lancamentosURL = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.lancamentosURL}?resumo`, {headers})
      .toPromise()
      .then(response => response.json().content);
  }
}
