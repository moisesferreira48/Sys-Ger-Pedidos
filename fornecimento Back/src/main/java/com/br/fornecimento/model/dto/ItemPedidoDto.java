package com.br.fornecimento.model.dto;

import com.br.fornecimento.model.ItemPedido;
import com.br.fornecimento.model.Pedido;

public class ItemPedidoDto {
	
	private Integer id;
	private String nome;
	private Integer quantidade;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Integer getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public ItemPedido fromDto(ItemPedidoDto objDto, Pedido pedido) {
		return new ItemPedido(objDto.getId(), objDto.getNome(), objDto.getQuantidade(), pedido);
	}

}
