import {  Pedido,PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  pedido: Pedido[];

  constructor(private service: PedidoService) {}


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
}
