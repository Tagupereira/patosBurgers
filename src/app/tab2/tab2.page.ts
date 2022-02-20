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
  aviso: string;
  valid: boolean;

  constructor(private service: PedidoService,
    public alert: AlertController,
    private modal: ModalController){}

  async abrirModal(codPedido, valor, cliente,tipo){
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps: {
        cod: codPedido,
        total: valor,
        nomeCliente: cliente,
        tipoPag: tipo
      }
    });
    modal.present();

  }

    ngOnInit() {
      this.service.getAll().subscribe(response =>{
        this.pedido = response;
      });
      setInterval(()=> {
        this.service.getAll().subscribe(response =>{
          this.pedido = response;
          this.aviso = 'Ainda não Possui Pedidos cadastrados!';
        });
      },1000);

  }
}
