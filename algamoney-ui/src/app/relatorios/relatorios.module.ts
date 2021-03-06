import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from 'primeng/components/common/shared';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,

    RelatoriosRoutingModule,
    SharedModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }
