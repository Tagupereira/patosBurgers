import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pedido{

  idCarrinho: number;
  codPedido: number;
  quantidade: number;
  valor: number;
  idProduto: number;
  imagem: string;
  produto: string;
  nome: string;

}


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private url = 'http://192.168.0.106/PROJETOS/API/carrinho';
  private url1 = 'http://192.168.0.106/PROJETOS/API/carrinhoD';

  constructor( private http: HttpClient) {}


  getAll(){
    return this.http.get<[Pedido]>(this.url);
  }
//remove 1 item do carrinho

  remove(idCarrinho: any){
    return this.http.delete(this.url + '/' + idCarrinho);
  }

  excluirCarrinho(delPedido){
    return this.http.delete(this.url1 + '/' + delPedido);
  }

}
