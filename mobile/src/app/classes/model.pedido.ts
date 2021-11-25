import { ModelCliente } from './model.cliente';
import { ModelPedidoItens } from './model.pedido.itens';

export class ModelPedido {
  idcoligada: number;
  cliente: ModelCliente;
  formapagamento: string; // dinheiro / cartao
  valorped: number;
  valorpago: number;
  taxa: number;
  observacao: any;
  pedidoItens: ModelPedidoItens[];

}

