import { environment } from './../../environments/environment';
import { Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/operator/toPromise';
import { stringify } from 'querystring';

import { Pessoa } from './../core/model';

export class PessoaFiltro {
  pagina = 0;
  itensPorPagina = 5;
  nome: string;
}

@Injectable()
export class PessoasService {

  constructor(private http: AuthHttp) { }

  pessoasURL = `${environment.apiUrl}/pessoas`;

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasURL}?`, { search: params })
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
    return this.http.get(this.pessoasURL)
      .toPromise()
      .then(result => result.json().content);

  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.pessoasURL}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  altarStatus(pessoa: any): Promise<any> {
    return this.http.put(`${this.pessoasURL}/${pessoa.codigo}/ativo`, JSON.stringify(!pessoa.ativo))
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasURL, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasURL}/${codigo}`)
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasURL}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

}
