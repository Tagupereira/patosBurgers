/* eslint-disable @typescript-eslint/quotes */

import { PedidoService } from './../services/pedido.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  cod: number;
  total: number;
  bairro: string;
  valEnt: number;
  nomeCliente: string;
  lista: any;
  quantidade: number;
  tipoPag: string;
  msg: string;
  colorToast: string;
  data: any;
  dateForm;

  constructor(
    private modal: ModalController,
    private pedido: PedidoService,
    private alert: AlertController,
    private toast: ToastController,
    private rota: Router
  ) {}

  fecharModal(){
    this.modal.dismiss();
  }

  ngOnInit() {
    this.pedido.getPedido(this.cod).subscribe(response =>{
      this.lista = response;
    });
    this.data = this.data.split('-').reverse().join('-');
    this.total = Number(this.total) + Number(this.valEnt);
  }

  async excluirPedido(cod) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+ 1;
    const year =  date.getFullYear();

    if (month < 10) {
      const mes = '0' + month;

      if (day < 10) {
        const dia = '0' + day;
        this.dateForm = dia +'-'+ mes +'-' + year;

      }else{
        this.dateForm = day +'-'+ mes +'-' + year;
      }

    }else{
      if (day < 10) {
        const dia = '0' + day;
        this.dateForm = dia +'-'+ month +'-' + year;

      }else{
        this.dateForm = day +'-'+ month +'-' + year;
      }
    }

    if(this.data === this.dateForm){
      const alert = await this.alert.create({
        header: 'Pedido #'+ cod,
        message: 'Excluir Pedido?',
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
              this.excluir(cod);
              this.msg='Pedido Excluido';
              this.colorToast = 'success';
              this.canceladoToast();
            }
          }
        ]
      });
    await alert.present();

    }
    else{
    this.msg = "Você nao tem permissâo para excluir o pedido";
    this.colorToast = "warning";
    this.canceladoToast();
    console.log('data', this.data);
    console.log('date', this.dateForm);

    }
  }

  excluir(cod){
    this.pedido.excluirCarrinho(cod).subscribe(() =>{
      this.fecharModal();

    });
  }

  async canceladoToast() {

    const toast = await this.toast.create({
      message: this.msg,
      duration: 1000,
      color: this.colorToast,
      position: 'top'
    });
    toast.present();
  }

}
