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

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private url = 'http://192.168.0.106/PROJETOS/API/produtos';

  private url1 = 'http://192.168.0.106/PROJETOS/API/carrinhoA';

  constructor(private http: HttpClient) {}

  getAll(){
    //return this.http.get<[Produto]>(this.url);
    return this.http.get<[Produto]>(this.url);
  }

  adicionar(addProduto: number){
    //console.log(addProduto);
    return this.http.post(this.url1, addProduto);
  }

  addimagem(img, produto, valor){
    alert('Produto Adicionado \n '+'Produto: '+produto+'\n Preço: '+valor+'\n Imagem: '+img);
    //return this.http.post(this.url, produto);
  }
}
