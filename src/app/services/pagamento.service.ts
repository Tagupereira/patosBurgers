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

  private url = 'http://192.168.0.106/PROJETOS/API/pagamento';

  constructor( private http: HttpClient) {}


  pagar(dados: [], cod: any){

   return this.http.put(this.url + '/' + cod, dados);
  }

  buscaEntregas(){
    return this.http.get<[Entrega]>(this.url +'/');
  }

}

