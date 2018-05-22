import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';

@Injectable()
export class DashboardService {

  lancamentosURL = `${environment.apiUrl}/lancamentos`;

  constructor(private http: AuthHttp) { }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosURL}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response.json());
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosURL}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response.json();
        this.converterStringParaData(dados);
        return dados;
      });
  }

  converterStringParaData(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
