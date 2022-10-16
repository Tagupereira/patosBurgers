/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
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
  color;
  pagamento;

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

    if(this.tipoPag === "Pendente"){
      this.color = "danger";
    }

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

  async mudarPagamento(cod){

    const alert = await this.alert.create({
      header: 'Pedido #'+ cod,
      message: 'Alterar pagamento '+ this.tipoPag+'?',
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
            this.alterarPagamento(cod);
            this.alert.dismiss;

          },

        }
      ]
    });
    await alert.present();

  }

  async alterarPagamento(cod){

    const alert = await this.alert.create({
      header: 'Pedido #'+ cod,
      message: 'Selecione um pagamento!',
      inputs: [
        {
          label: 'Dinheiro',
          type: 'radio',
          value: '1',
          handler: () => {
            this.pagamento = 1;
            console.log(this.pagamento);
          }
        },
        {
          label: 'PIX',
          type: 'radio',
          value: '2',
          handler: () => {
            this.pagamento = 2;
            console.log(this.pagamento);
          }
        },
        {
          label: 'Cartão',
          type: 'radio',
          value: '5',
          handler: () => {
            this.pagamento = 5;
            console.log(this.pagamento);
          }

        },
        {
          label: 'Pendente',
          type: 'radio',
          value: '6',
          handler: () => {
            this.pagamento = 6;
            console.log(this.pagamento);
          }
        }
      ],

      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            this.msg='Pagamento recebido!';
            this.colorToast = 'success';
            this.canceladoToast();
            this.fecharModal();
            this.recebePagamento(cod);

          }
        }
      ]

    });
    await alert.present();

  }
  recebePagamento(cod){
    this.pedido.alterarPagamento(cod, this.pagamento).subscribe(response =>{
      console.log(response);
      this.fecharModal();

    });
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
