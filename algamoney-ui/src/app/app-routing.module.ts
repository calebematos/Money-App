import { patch } from 'webdriver-js-extender';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';

const rotas: Routes = [

  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule'},
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule'},
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule'},

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }

];


@NgModule({

  imports: [
    RouterModule.forRoot(rotas),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
