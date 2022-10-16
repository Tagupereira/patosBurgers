import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Entrega{

  idEntrega: number;
  local: string;
  valor: number;

}

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  //pasta ='TESTE';
  pasta ='PROJETOS';

  private url = 'http://192.168.0.106/'+this.pasta+'/API/pagamento';

  constructor( private http: HttpClient) {}


  pagar(dados: [], cod: any){

   return this.http.put(this.url + '/' + cod, dados);
  }

  buscaEntregas(){
    return this.http.get<[Entrega]>(this.url +'/');
  }

}

