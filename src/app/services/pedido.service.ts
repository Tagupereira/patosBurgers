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
  idEntrega: number;
}




@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  //pasta ='TESTE';
  pasta ='PROJETOS';

  private url = 'http://192.168.0.106/'+this.pasta+'/API/pedidos';
  private url1 = 'http://192.168.0.106/'+this.pasta+'/API/carrinhoD';


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

  alterarPagamento(idPedido: any, pagamento: any){
    //console.log(cod, pagamento, 'recebido');
    return this.http.put(this.url + '/' + idPedido, pagamento);
  }

}
