package com.br.fornecimento.model.dto;

import java.math.BigDecimal;
import java.util.List;

import com.br.fornecimento.model.StatusPedido;

public class PedidoDto  {
	
	private Integer id;
	private String fornecedor;
	private BigDecimal valorTotal;
	private List<ItemPedidoDto> itemPedido;
	private StatusPedido status;
	
	public String getFornecedor() {
		return fornecedor;
	}
	public void setFornecedor(String fornecedor) {
		this.fornecedor = fornecedor;
	}
	public BigDecimal getValorTotal() {
		return valorTotal;
	}
	public void setValorTotal(BigDecimal valorTotal) {
		this.valorTotal = valorTotal;
	}
	public List<ItemPedidoDto> getItemPedido() {
		return itemPedido;
	}
	public void setItemPedido(List<ItemPedidoDto> itemPedido) {
		this.itemPedido = itemPedido;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public StatusPedido getStatus() {
		return status;
	}
	public void setStatus(StatusPedido status) {
		this.status = status;
	}
	
}
