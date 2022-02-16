import { Produto, ProdutosService } from './../services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  titulo = 'Balcão';
  produtos: Produto[];
  alertController: any;


  constructor(public toastController: ToastController,
    private service:  ProdutosService,
    public action: ActionSheetController
    ){}

  ngOnInit() {
    this.service.getAll().subscribe(response =>{
      this.produtos = response;
    });
  }

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

// codigo do refresh------------------------------------

  doRefresh(event) {

    setTimeout(() => {
      this.service.getAll().subscribe(response =>{
        this.produtos = response;
      });

      event.target.complete();
    }, 800);
  }

  ////////////////////////////

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

