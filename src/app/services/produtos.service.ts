import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Produto{

  idProduto: any;
  nome: string;
  descricao: string;
  valor: number;
  imagem: string;
  idCategoria: number;

}

export interface Categoria{

  idCategoria: any;
  nome: string;

}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private url = 'http://192.168.0.106/PROJETOS/API/produtos';

  private url1 = 'http://192.168.0.106/PROJETOS/API/carrinhoA';

  private urlCat = 'http://192.168.0.106/PROJETOS/API/categoria';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<[Produto]>(this.url);
  }

  adicionar(addProduto: number){
    return this.http.post(this.url1, addProduto);
  }

  cadastrarProduto(adiciona){
    return this.http.post(this.url, adiciona);
  }

  getAllCat(){
    //return this.http.get<[Produto]>(this.url);
    return this.http.get<[Categoria]>(this.urlCat);
  }
}
