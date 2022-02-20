import { Pedido, PedidosService } from '../services/carrinho.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  msg: string;
  pedidos: Pedido[];
  codPedido=0;
  soma=0.00;

  burger='./assets/icon_tabs/fast-food.svg';
  pedido='./assets/icon_tabs/list.svg';
  carrinho='./assets/icon_tabs/cart.svg';

  constructor(private service: PedidosService) {}

  doRefresh(event){
    setInterval(()=> {
      this.service.getAll().subscribe(response =>{
        this.pedidos = response;
        console.log('deu certo');
      });
      event.target.complete();
    },1000);
  }

  ngOnInit(){}

}


