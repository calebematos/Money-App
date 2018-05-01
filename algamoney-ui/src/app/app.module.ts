import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const rotas: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(rotas),

    CoreModule,
    LancamentosModule,
    PessoasModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
