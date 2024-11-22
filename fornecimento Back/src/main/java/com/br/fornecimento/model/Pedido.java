package com.br.fornecimento.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Pedido implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Integer id;
	private String fornecedor;
	private LocalDateTime dataHoraPedido;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pedido", fetch = FetchType.LAZY)
	private List<ItemPedido> itemPedido;

	private BigDecimal valorTotal;
	private StatusPedido statusPedido;
	
	protected Pedido() {
	}

	public Pedido(String fornecedor, BigDecimal valorTotal,
			StatusPedido statusPedido) {
		this.fornecedor = fornecedor;
		this.dataHoraPedido = LocalDateTime.now();
		this.valorTotal = valorTotal;
		this.statusPedido = statusPedido;
		this.itemPedido = new ArrayList<>();
	}
	
	public void inseirItem(ItemPedido item) {
		this.itemPedido.add(item);
	}

	public Integer getId() {
		return id;
	}

	public String getFornecedor() {
		return fornecedor;
	}

	public LocalDateTime getDataHoraPedido() {
		return dataHoraPedido;
	}

	public List<ItemPedido> getItemPedido() {
		return itemPedido;
	}

	public BigDecimal getValorTotal() {
		return valorTotal;
	}

	public StatusPedido getStatusPedido() {
		return statusPedido;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setFornecedor(String fornecedor) {
		this.fornecedor = fornecedor;
	}

	public void setDataHoraPedido(LocalDateTime dataHoraPedido) {
		this.dataHoraPedido = dataHoraPedido;
	}

	public void setItemPedido(List<ItemPedido> itemPedido) {
		this.itemPedido = itemPedido;
	}

	public void setValorTotal(BigDecimal valorTotal) {
		this.valorTotal = valorTotal;
	}

	public void setStatusPedido(StatusPedido statusPedido) {
		this.statusPedido = statusPedido;
	}

}
