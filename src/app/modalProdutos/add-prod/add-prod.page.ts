/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Categoria } from './../../services/produtos.service';
import { Produto, ProdutosService } from './../../services/produtos.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.page.html',
  styleUrls: ['./add-prod.page.scss'],
})

export class AddProdPage implements OnInit, OnDestroy {

  files: Set<File>;
  titulo = 'Novo Produto';
  imagem = 'assets/img/produtos/qualquer.jpg';
  foto = 'assets/img/produtos/maisTeste.jpg';
  label = 'Adicionar imagem';
  caminho = 'assets/img/produtos/';

  product: string ;
  price;
  valorView;
  cat;
  precoProduto;

  categoria: Categoria[];
  listaCategorias = [];
  adiciona = {};

  constructor(
    public toastController: ToastController,
    private service: ProdutosService,
    private rota: Router) {}

  ngOnInit() {
    this.service.getAllCat().subscribe(response =>{
      this.categoria = response;

    /////// for para adicionar dados do dia atual no array
      for (let i = 0; i < this.categoria.length; i++){
        this.listaCategorias.push(this.categoria[i]);
      }
    });
  }

  ionViewDidEnter() {
    this.noBack();
  }

  nome(event){
    this.product = event.target.value;
  }

  valor(event){
    this.price = event.target.value;
  }

  category(event){
    this.cat = event.target.value;
  }

  onChange(event){

    const files = <FileList>event.srcElement.files;
    const view = files[0];
    const imgGet = files[0].name;

    this.files = new Set();
    this.imagem = imgGet;
    this.foto = URL.createObjectURL(event.target.files[0]);

    this.label = 'Imagem: '+ imgGet;
    console.log(files);

  }

  adicionarProduto(){
    if(!this.product){
      alert('informe o nome do produto');
    }else{
      this.adiciona["nome"] = this.product;
      this.adiciona["preco"] = this.precoProduto;
      this.adiciona["categoria"] = this.cat;
      this.adiciona["imagem"] = this.imagem;

      const adiciona = this.adiciona;

      this.service.cadastrarProduto(adiciona).subscribe(response=>{

        this.adicionadoToast();
        this.rota.navigateByUrl('/');
      });

    }

  }

  fechar(){
    this.rota.navigateByUrl('/');
  }

  noBack(){
    //esta fun????o bloqueia o botao back no app
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });
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
    this.precoProduto = valor;

  }

  resetar(){
    this.listaCategorias = [];
    this.price = '';
    this.valorView = '';
    this.cat = '';
    this.imagem = 'assets/img/produtos/qualquer.jpg';

  }

  // codigo toast alert
  async adicionadoToast() {
    const toast = await this.toastController.create({
      message: 'Produto Adicionado com sucesso',
      duration: 2000,
      color: 'primary',
      position: 'top'

    });
    toast.present();
  }

  ngOnDestroy(): void {
    this.noBack();
    this.resetar();
  }

}
