import { Produto, ProdutosService } from './../services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  titulo = 'Balcão';
  produtos: Produto[];


  constructor(public toastController: ToastController, private service:  ProdutosService) {}

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


}

