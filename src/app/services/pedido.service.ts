import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pedido{

  idPedido: number;
  codPedido: number;
  dataPedido: string;
  cliente: string;
  quantidade: number;
  valor: number;
  idProduto: number;
  idPagamento: number;
  nome: string;
  imagem: string;
  produto: string;
  idCategoria: number;
  tipo: string;
}


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url = 'http://192.168.0.106/PROJETOS/API/pedidos';
  private url1 = 'http://192.168.0.106/PROJETOS/API/carrinhoD';


  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<[Pedido]>(this.url);
  }

  getPedido(idPedido){
    return this.http.get<[Pedido]>(this.url+'/'+idPedido);
  }

  excluirCarrinho(delPedido){
    return this.http.delete(this.url1 + '/' + delPedido);
  }

}
