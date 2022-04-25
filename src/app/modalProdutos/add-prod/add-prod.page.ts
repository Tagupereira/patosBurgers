/* eslint-disable radix */
/* eslint-disable @typescript-eslint/quotes */
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
  valorView;

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
      alert('informe o nome do produto');
    }else{
      this.service.addimagem(this.imagem, this.product, this.price);
      //this.adicionadoToast(nome);
    }

  }

  formatarMoeda() {

    let valor = this.price;
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g,''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ".$1");

    if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1.$2");
      //se quiser alterar a , por . so alterar no trecho acima $1.$2;
    }
    else if (isNaN(valor)){
      valor = '0.00';
    }

    this.price = valor;
    this.valorView = 'R$ '+ valor;

  }

  ngOnInit() {}
}
