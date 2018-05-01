import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Pessoa } from './../core/model';

import 'rxjs/operator/toPromise';
import { stringify } from 'querystring';

export class PessoaFiltro {
  pagina = 0;
  itensPorPagina = 5;
  nome: string;
}

@Injectable()
export class PessoasService {

  constructor(private http: Http) { }

  pessoasURL = 'http://localhost:8080/pessoas';

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasURL}?`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;
        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(this.pessoasURL, { headers })
      .toPromise()
      .then(result => result.json().content);

  }

  excluir(codigo: number): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.delete(`${this.pessoasURL}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  altarStatus(pessoa: any): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasURL}/${pessoa.codigo}/ativo`, JSON.stringify(!pessoa.ativo), { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasURL, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json());
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.pessoasURL}/${codigo}`, { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasURL}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json());
  }



}
