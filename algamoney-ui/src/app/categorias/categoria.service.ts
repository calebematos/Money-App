import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/operator/toPromise';
import { environment } from './../../environments/environment';

@Injectable()
export class CategoriaService {

  constructor(private http: AuthHttp) { }

  pessoasURL = `${environment.apiUrl}/categorias`;


  listarTodas(): Promise<any> {

    return this.http.get(this.pessoasURL)
      .toPromise()
      .then(response => response.json());
  }

}
