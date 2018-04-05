package com.calebematos.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.calebematos.api.model.Lancamento;
import com.calebematos.api.repository.lancamento.LancamentoRepositoryQuery;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery{

}
