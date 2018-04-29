import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/operator/toPromise';

@Injectable()
export class CategoriaService {

  constructor(private http: Http) { }

  pessoasURL = 'http://localhost:8080/categorias';


  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(this.pessoasURL, { headers })
      .toPromise()
      .then(response => response.json());
  }

}
