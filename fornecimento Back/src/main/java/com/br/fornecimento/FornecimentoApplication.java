package com.br.fornecimento;

import java.math.BigDecimal;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.br.fornecimento.model.ItemPedido;
import com.br.fornecimento.model.Pedido;
import com.br.fornecimento.model.StatusPedido;
import com.br.fornecimento.repository.PedidoRepository;

@SpringBootApplication
public class FornecimentoApplication implements CommandLineRunner {
	
	@Autowired
	private PedidoRepository pedidoRepo;

	public static void main(String[] args) {
		SpringApplication.run(FornecimentoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		Pedido pedido = new Pedido("Fornecedor x", new BigDecimal(200.00), StatusPedido.EM_ANDAMENTO);
		
		ItemPedido produto = new ItemPedido("Produto x", 100, pedido);
		ItemPedido produto2 = new ItemPedido("Produto y", 170, pedido);
		
		pedido.getItemPedido().addAll(Arrays.asList(produto, produto2));
		
		pedidoRepo.save(pedido);
		
	}

}
