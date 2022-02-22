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

  constructor(private service: PedidoService,
    public alert: AlertController,
    private modal: ModalController){}

  async abrirModal(codPedido, valor, cliente,tipo, dataPedido){
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps: {
        cod: codPedido,
        total: valor,
        nomeCliente: cliente,
        tipoPag: tipo,
        data: dataPedido
      }
    });
    modal.present();
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
    ngOnInit() {}
}
