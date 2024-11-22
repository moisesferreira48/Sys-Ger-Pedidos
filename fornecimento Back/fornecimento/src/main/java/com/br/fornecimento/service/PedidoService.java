package com.br.fornecimento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.fornecimento.model.ItemPedido;
import com.br.fornecimento.model.Pedido;
import com.br.fornecimento.model.StatusPedido;
import com.br.fornecimento.model.dto.ItemPedidoDto;
import com.br.fornecimento.model.dto.PedidoDto;
import com.br.fornecimento.repository.PedidoRepository;
import com.br.fornecimento.service.exceptions.ObjectNotFoundException;

@Service
public class PedidoService {
	
	@Autowired
	private PedidoRepository repo;
	
	public List<Pedido> listarTodos() {
		return repo.findAll();
	}
	
	public Pedido buscar(Integer id) {
		Optional<Pedido> objeto = repo.findById(id);
		return objeto.orElseThrow(() -> new ObjectNotFoundException("OBJETO NÃO ENCONTRADO! Id: "+id
				+", Tipo: "+Pedido.class.getName()));
	}
	
	public Pedido inserir(PedidoDto novoPedido) {
		Pedido pedido = new Pedido(novoPedido.getFornecedor(), novoPedido.getValorTotal(), StatusPedido.PENDENTE);
		for (ItemPedidoDto novoItemPedido: novoPedido.getItemPedido()) {
			ItemPedido itemPedido = new ItemPedido(novoItemPedido.getNome(), novoItemPedido.getQuantidade(), pedido);
			pedido.inseirItem(itemPedido);
		}
		return repo.save(pedido);
	}
	
	public Pedido atualizar(PedidoDto pedidoAtualizado) {
		Pedido pedido = buscar(pedidoAtualizado.getId());
		pedido.setFornecedor(pedidoAtualizado.getFornecedor());
		pedido.setStatusPedido(pedidoAtualizado.getStatus());
		pedido.setValorTotal(pedidoAtualizado.getValorTotal());
		List<ItemPedido> itens = new ArrayList<>();
		for (ItemPedidoDto item : pedidoAtualizado.getItemPedido()) {
			ItemPedido itemPedido = item.fromDto(item, pedido);
			itens.add(itemPedido);
		}
		pedido.setItemPedido(itens);
		return repo.save(pedido);
	}
	
	public void deletar(Integer id) {
		repo.deleteById(id);
	}

}
