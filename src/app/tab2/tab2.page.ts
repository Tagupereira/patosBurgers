/* eslint-disable @typescript-eslint/prefer-for-of */
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

  teste;

  constructor(private service: PedidoService,
    public alert: AlertController,
    private modal: ModalController){

      this.service.getAll().subscribe(response =>{
        this.pedido = response;


        this.pedidoData = this.pedido.reduce(function(acumulador, datArray){
          if(!acumulador[datArray.dataPedido]){
            acumulador[datArray.dataPedido] = [datArray.dataPedido];
          }
          acumulador[datArray.dataPedido].push(datArray);
          return acumulador;

        }, {});

        this.teste = Object.values(this.pedidoData);
        console.log(this.teste);

      });
    }









  doRefresh(event){
    setTimeout(() => {
      this.service.getAll().subscribe(response =>{
        this.pedido = response;
      });
      //console.log('atualizei');
      event.target.complete();
    }, 800);
  }

  ionViewDidEnter() {
    this.service.getAll().subscribe(response =>{
      this.pedido = response;
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


}
