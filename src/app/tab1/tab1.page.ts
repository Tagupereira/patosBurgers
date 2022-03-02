/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */

import { Produto, ProdutosService } from './../services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';



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



  constructor(public toastController: ToastController,
    private service:  ProdutosService,
    public action: ActionSheetController
    ){
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
        for(let i = 0; i < response.length; i++){

          if(response[i].idCategoria==6){

            this.entregas.push({
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

    doRefresh(event){
      setTimeout(() => {
        this.service.getAll().subscribe(response =>{
          this.produtos = response;
        });
        event.target.complete();
      }, 800);
    }

  ngOnInit() {}

  adicionaItem(idProduto, nome){
    this.service.adicionar(idProduto).subscribe(response =>{

    });
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
          console.log('Novo Produto');
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
          text: 'Excluir Produto',
          icon: 'close',
          data: {
            type: 'Excluir Produto'
          },
          handler: () => {
            console.log('Excluir Produto');
          }
      }]
    });
    await actionSheet.present();
  }
  ///////////////////////////
}

