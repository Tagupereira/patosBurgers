import { AlertController } from '@ionic/angular';
import {  Pedido,PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  pedido: Pedido[];

  constructor(private service: PedidoService, public alert: AlertController) {}


  ngOnInit() {
    this.service.getAll().subscribe(response =>{
      this.pedido = response;
    });
    console.log(this.pedido);
  }
  // codigo do refresh------------------------------------

  doRefresh(event) {

    setTimeout(() => {
      this.service.getAll().subscribe(response =>{
        this.pedido = response;
      });

      event.target.complete();
    }, 800);
  }

  ////////////////////////////
   async pedidoCliente(codPedido, valor, cliente) {

    const alert = await this.alert.create({

    header: 'cod: '+codPedido,
    subHeader:'Cliente: '+cliente,
    message:'<h1>R$ '+valor+'</h1>',

  });
await alert.present();
}
}
