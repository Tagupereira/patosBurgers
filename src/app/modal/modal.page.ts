import { Pedido } from './../services/carrinho.service';
import { PedidoService } from './../services/pedido.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  cod: number;
  total: number;
  nomeCliente: string;
  lista: any;
  quantidade: number;
  tipoPag: string;
  msg: string;
  colorToast: string;

  constructor(private modal: ModalController,
    private pedido: PedidoService,
    private alert: AlertController,
    private toast: ToastController) {}

  fecharModal(){
    this.modal.dismiss();
  }

  ngOnInit() {
    this.pedido.getPedido(this.cod).subscribe(response =>{
      this.lista = response;
      console.log(this.lista);
    });

  }

  async excluirPedido(cod) {

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
