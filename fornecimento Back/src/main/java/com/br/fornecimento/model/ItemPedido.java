package com.br.fornecimento.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ItemPedido implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String nome;
	private Integer quantidade;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Pedido pedido;
	
	protected ItemPedido() {
	}

	public ItemPedido(String nome, Integer quantidade, Pedido pedido) {
		super();
		this.nome = nome;
		this.quantidade = quantidade;
		this.pedido = pedido;
	}
	
	public ItemPedido(Integer id, String nome, Integer quantidade, Pedido pedido) {
		super();
		this.id = id;
		this.nome = nome;
		this.quantidade = quantidade;
		this.pedido = pedido;
	}

	public Integer getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

}
