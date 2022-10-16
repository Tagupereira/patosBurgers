/* eslint-disable prefer-const */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */

import { Produto, ProdutosService } from './../services/produtos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonAccordionGroup, ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Pedido, PedidosService } from '../services/carrinho.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  titulo = 'Balcão';
  produtos: Produto[];
  combo = [];
  individuais = [];
  batatas = [];
  refrigerantes = [];
  adicionais = [];
  doces = [];
  descontos = [];
  msg;
  colorToast;

  contItem;
  valor;
  textButton;
  infoButton;
  pedidos: Pedido[];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private service:  ProdutosService,
    public action: ActionSheetController,
    private modal: ModalController,
    private route: Router,
    private pedidoService: PedidosService,
    ){}

  ngOnInit() {
    this.noBack();
    this.pedidos = [];
  }

  doRefresh(event){
    setTimeout(() => {
      this.resetaListas();
      this.atualizaProdutos();
      this.noBack();
      this.accordionGroup.value = undefined;
      this.verificaItens();
      event.target.complete();
    }, 800);
  }

  ionViewDidEnter() {
    this.pedidos = [];
    // aqui seta todos os arrays de produtos para vazios evitando duplicidade de dados ou ser atualizada a pagina
    this.resetaListas();
    this.atualizaProdutos();
    this.noBack();
    this.verificaItens();
    this.accordionGroup.value = undefined;


  }

  noBack(){
    //esta função bloqueia o botao back no app
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });

  }

  adicionaItem(idProduto, nome){

    //esta função adiciona itens ao carrinho de compra
    this.service.adicionar(idProduto).subscribe(response =>{
      this.verificaItens();
    });

    this.msg = nome + ' adicionado ao carrinho';
    this.colorToast = 'primary';
    // emite um alerta de adicionado com sucesso
    this.toast();

  }

  verificaItens(){

    this.pedidoService.getAll().subscribe(response =>{

      this.pedidos = response;
      this.contItem = 0;
      if(this.pedidos.length > 0){

         for(let i = 0; i <= this.pedidos.length; i++){

           let cont = Number(this.pedidos[i].quantidade);

           if(cont > 0){

            this.contItem = this.contItem + cont;
            this.textButton = ' item(s) ';
            this.valor = this.pedidos[i][0].valorTotal;
            this.infoButton = this.contItem + this.textButton + ' R$'+ this.valor;

           }else{

             this.infoButton = '(0)Carrinho Vazio';

           }//fim do else
         }//fim do for
      }//fim do if
      else
      {
        this.infoButton = '(0)Carrinho Vazio';
      }//fim do else

    });
  }

  async remover(id, nome){
    const alert = await this.alertController.create({
      header: 'Excluir Item',
      message: 'Deseja excluir '+ nome + '?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }, {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            this.msg='Item '+nome+' Excluido!';
            this.colorToast = 'primary';
            this.toast();
            this.excluir(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async toast() {
    const toast = await this.toastController.create({
      message: this.msg,
      duration: 2000,
      color: this.colorToast,
      position: 'top'

    });
    toast.present();
  }
  ////////////////////////////abre o toast para adicionar novos produtos
  async teste() {
    const actionSheet = await this.action.create({
      header: 'Adicionar',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Novo Produto',
        icon: 'add',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.route.navigateByUrl('add-prod');
        }
      },{
        text: 'Pedidos',
        icon: 'list',
        data: {
          type: 'Editar Produto'
        },
        handler: () => {
          this.route.navigateByUrl('/tabs/tab2');
        }
    },{
          text: 'Nova Categoria',
          icon: 'color-wand-outline',
          data: {
            type: 'Nova Categoria'
          },
          handler: () => {
            console.log('categoria');
          }
        },{
        text: 'Entregas',
        icon: 'bicycle',
        data: {
          type: 'Entregas'
        },
        handler: () => {
          this.route.navigateByUrl('entregas');
        }
    }]
    });
    await actionSheet.present();
  }
  ///////////////////////////
  excluir(id){

    this.service.remove(id).subscribe(response =>{
      console.log(response);
      this.resetaListas();
      this.atualizaProdutos();
      this.noBack();
      this.accordionGroup.value = undefined;
    });

  }

  atualizaProdutos(){
    // função responsavel por receber os dados dos produtos cadastrados
    // alimentando os arrays.
    this.service.getAll().subscribe(response =>{
      this.produtos = response;
      ////////////// array de combos //////////////////
        for(let i = 0; i < response.length; i++){
          if(response[i].idCategoria==1){
            this.combo.push({
              idProduto: response[i].idProduto,
              nome:response[i].nome,
              descricao: response[i].descricao,
              valor: response[i].valor,
              imagem: response[i].imagem,
              idCategoria: response[i].idCategoria
            });
          }
        }
      ////////////// array de individuais //////////////////
        for(let i = 0; i < response.length; i++){
          if(response[i].idCategoria==2){
            this.individuais.push({
              idProduto: response[i].idProduto,
              nome:response[i].nome,
              descricao: response[i].descricao,
              valor: response[i].valor,
              imagem: response[i].imagem,
              idCategoria: response[i].idCategoria
            });
          }
        }
      ////////////// array de batatas //////////////////
        for(let i = 0; i < response.length; i++){
          if(response[i].idCategoria==3){
            this.batatas.push({
              idProduto: response[i].idProduto,
              nome:response[i].nome,
              descricao: response[i].descricao,
              valor: response[i].valor,
              imagem: response[i].imagem,
              idCategoria: response[i].idCategoria
            });
          }
        }
      ////////////// array de refrigerantes //////////////////
        for(let i = 0; i < response.length; i++){
          if(response[i].idCategoria==4){
            this.refrigerantes.push({
              idProduto: response[i].idProduto,
              nome:response[i].nome,
              descricao: response[i].descricao,
              valor: response[i].valor,
              imagem: response[i].imagem,
              idCategoria: response[i].idCategoria
            });
          }
        }
      ////////////// array de adicionais //////////////////
        for(let i = 0; i < response.length; i++){
          if(response[i].idCategoria==5){
            this.adicionais.push({
              idProduto: response[i].idProduto,
              nome:response[i].nome,
              descricao: response[i].descricao,
              valor: response[i].valor,
              imagem: response[i].imagem,
              idCategoria: response[i].idCategoria
            });
          }
        }
      ////////////// array de doces //////////////////
        for(let i = 0; i < response.length; i++){
          if(response[i].idCategoria==6){
            this.doces.push({
              idProduto: response[i].idProduto,
              nome:response[i].nome,
              descricao: response[i].descricao,
              valor: response[i].valor,
              imagem: response[i].imagem,
              idCategoria: response[i].idCategoria
            });
          }
        }
      ////////////// array de descontos //////////////////
      for(let i = 0; i < response.length; i++){
        if(response[i].idCategoria==7){
          this.descontos.push({
            idProduto: response[i].idProduto,
            nome:response[i].nome,
            descricao: response[i].descricao,
            valor: response[i].valor,
            imagem: response[i].imagem,
            idCategoria: response[i].idCategoria
          });
        }
      }
    });

    setTimeout(()=> {
      this.service.getAll().subscribe(response =>{
        this.produtos = response;

      });
    });
  }

  resetaListas(){
    this.combo = [];
    this.individuais = [];
    this.batatas = [];
    this.refrigerantes = [];
    this.adicionais = [];
    this.doces = [];
    this.descontos = [];
    this.pedidos = [];
  }

  carrinho(){
    if(this.pedidos.length > 0){
      this.route.navigateByUrl('/tabs/tab3');
    }else{
      this.msg='Carrinho está vazio';
      this.colorToast = 'warning';
      this.toast();
    }
  }
}



