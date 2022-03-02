/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
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
  dataAtual = new Date();
  semana=[];
  meses=[];
  mes = this.dataAtual.getMonth();
  ano = this.dataAtual.getFullYear();
  getDia = this.dataAtual.getDay();
  dia;


  constructor(private service: PedidoService,
    public alert: AlertController,
    private modal: ModalController){

      this.service.getAll().subscribe(response =>{
        this.pedido = response;
      });

      this.semana = [
        'domingo',
        'segunda-Feira',
        'terça-Feira',
        'quarta-Feira',
        'quinta-Feira',
        'sexta-Feira',
        'sábado'
      ];
      this.meses = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
      ];
      this.dia  = this.semana[this.getDia]+', '+this.getDia+' de '+this.meses[this.mes]+' de '+this.ano;
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

  ngOnInit() {}

}
