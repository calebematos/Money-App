import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaFiltro, PessoasService } from './../pessoas.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  pessoas;
  totalDeRegistros;
  @ViewChild('tabela') tabela;

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  constructor(
    private pessoasService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalDeRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
        }
        this.toasty.success('Registro excluido com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  altarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    this.pessoasService.altarStatus(pessoa)
      .then(() => {
        pessoa.ativo = novoStatus;
        const msg = pessoa.ativo ? 'desativada' : 'ativada';
        this.toasty.success(`Pessoa ${msg} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

}
