import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Produto{

  idProduto: any;
  nome: string;
  descricao: string;
  valor: any;
  imagem: string;
  idCategoria: any;

}
@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private url = 'http://192.168.0.106/PROJETOS/API/produtos';

  private url1 = 'http://192.168.0.106/PROJETOS/API/carrinhoP';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<[Produto]>(this.url);
  }

  adicionar(add){
    console.log(add);
    return this.http.post(this.url1, add);
  }
}
