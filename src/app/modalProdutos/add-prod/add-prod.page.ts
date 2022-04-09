/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Produto, ProdutosService } from './../../services/produtos.service';


import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.page.html',
  styleUrls: ['./add-prod.page.scss'],
})

export class AddProdPage implements OnInit {

  files: Set<File>;
  titulo = 'Novo Produto';
  imagem = 'assets/img/produtos/maisTeste.jpg';
  foto = 'assets/img/produtos/maisTeste.jpg';
  label = 'Adicionar imagem';
  caminho = 'assets/img/produtos/';

  product: string ;
  price;
  totalPreco;

  constructor(private service: ProdutosService) {}

  nome(event){
    this.product = event.target.value;

  }
  valor(event){
    this.price = event.target.value;
  }

  onChange(event){

    const files = <FileList>event.srcElement.files;
    const view = files[0];
    const imgGet = files[0].name;

    this.files = new Set();
    this.imagem = imgGet;
    this.foto = URL.createObjectURL(event.target.files[0]);

    this.label = 'Imagem: '+ imgGet;

  }

  adicionarProduto(){
    if(!this.product){
      console.log('informe o nome do produto');
    }else{
      this.service.addimagem(this.imagem, this.product, this.price);
      //this.adicionadoToast(nome);
    }

  }

  ngOnInit() {}


}


