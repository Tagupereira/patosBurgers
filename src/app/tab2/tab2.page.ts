/* eslint-disable prefer-arrow/prefer-arrow-functions */


import { ModalPage } from './../modal/modal.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Pedido,PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  pedido: Pedido[];

  pedidoData = {};

  datas;

  valorAtual = 0.00;
  sum = 0.00;

  constructor(private service: PedidoService,
    public alert: AlertController,
    private modal: ModalController){}

  doRefresh(event){
    setTimeout(() => {
      this.service.getAll().subscribe(response =>{
        this.pedido = response;
        this.atualizaPedidos();
      });
      event.target.complete();
    }, 800);
  }

  ionViewDidEnter() {
    this.service.getAll().subscribe(response =>{
      this.pedido = response;
      this.atualizaPedidos();
    });

    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });

  }

  async abrirModal(codPedido, valor, cliente,tipo, dataPedido){
    if(valor > 0 ){
      const modal = await this.modal.create({
        component: ModalPage,
        componentProps: {
          cod: codPedido,
          total: valor,
          nomeCliente: cliente,
          tipoPag: tipo,
          data: dataPedido
        },

      });
      modal.present();
    }
  }

  ngOnInit() {}

  public atualizaPedidos(){
    this.pedidoData = this.pedido.reduce(function(acumulador, datArray){
      if(!acumulador[datArray.dataPedido]){
        acumulador[datArray.dataPedido] = [datArray.dataPedido];
      }
      acumulador[datArray.dataPedido].push(datArray);
      return acumulador;

    }, {});

    this.datas = Object.values(this.pedidoData);

    this.sum = 0.00;

    for(let i = 0; i < this.datas.length; i++){

      this.valorAtual = Number(this.datas[0][i+1].valor);
      this.sum = this.valorAtual + this.sum;

    }
  }

}
