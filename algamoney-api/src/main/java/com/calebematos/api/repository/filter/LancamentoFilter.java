package com.calebematos.api.repository.filter;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

public class LancamentoFilter {

	private String descricao;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataVancimentoDe;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataVancimentoAte;

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDataVancimentoDe() {
		return dataVancimentoDe;
	}

	public void setDataVancimentoDe(LocalDate dataVancimentoDe) {
		this.dataVancimentoDe = dataVancimentoDe;
	}

	public LocalDate getDataVancimentoAte() {
		return dataVancimentoAte;
	}

	public void setDataVancimentoAte(LocalDate dataVancimentoAte) {
		this.dataVancimentoAte = dataVancimentoAte;
	}

}
