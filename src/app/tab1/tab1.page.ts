/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */

import { Produto, ProdutosService } from './../services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  titulo = 'Balcão';
  produtos: Produto[];
  combo = [];
  individuais = [];
  batatas = [];
  refrigerantes = [];
  adicionais = [];
  entregas = [];
  descontos = [];

  constructor(public toastController: ToastController,
    private service:  ProdutosService,
    public action: ActionSheetController,
    private modal: ModalController,
    private route: Router,
    ){}

    doRefresh(event){
      setTimeout(() => {
        //this.atualizaProdutos();
        event.target.complete();
        //console.log('refresh');
      },800);
    }

    ionViewDidEnter() {
     // aqui seta todos os arrays de produtos para vazios evitando duplicidade de dados ou ser atualizada a pagina
      this.combo = [];
      this.individuais = [];
      this.batatas = [];
      this.refrigerantes = [];
      this.adicionais = [];
      this.entregas = [];
      this.descontos = [];

      this.atualizaProdutos();
      //esta função bloqueia o botao back no app
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function() {
            history.pushState(null, null, document.URL);
      });

    }

  ngOnInit() {}

  adicionaItem(idProduto, nome){
    //esta função adiciona itens ao carrinho de compra
    this.service.adicionar(idProduto).subscribe(response =>{

    });
    // emite um alerta de adicionado com sucesso
    this.adicionadoToast(nome);
  }

// codigo toast alert
  async adicionadoToast(nome) {
    const toast = await this.toastController.create({
      message: nome + ' Adicionado ao Pedido.',
      duration: 2000,
      color: 'success',
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
          text: 'Nova Categoria',
          icon: 'list',
          data: {
            type: 'Nova Categoria'
          },
          handler: () => {
            console.log('categoria');
          }
        },{
          text: 'Editar Produto',
          icon: 'color-wand-outline',
          data: {
            type: 'Editar Produto'
          },
          handler: () => {
            console.log('Editar Produto');
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
    ////////////// array de entregas //////////////////
    // for(let i = 0; i < response.length; i++){

    //   if(response[i].idCategoria==6){

    //       this.entregas.push({
    //         idProduto: response[i].idProduto,
    //         nome:response[i].nome,
    //         descricao: response[i].descricao,
    //         valor: response[i].valor,
    //         imagem: response[i].imagem,
    //         idCategoria: response[i].idCategoria
    //       });

    //     }

    //   }
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


}

