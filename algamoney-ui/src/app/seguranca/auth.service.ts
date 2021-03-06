import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';
import 'rxjs/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();

          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválido!');
          }
        }
        return Promise.reject(response);
      });
  }
  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);
        console.log('Novo access token criado');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token', response);
        return Promise.resolve(null);
      });

  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(permissoes) {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
        return true;
      }
    }
    return false;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }
}
