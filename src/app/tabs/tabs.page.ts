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

  atualizaPedido(){
    this.service.getAll().subscribe(response =>{
      this.pedidos = response;
      this.soma = this.soma;
      if(response.length <= 0){
        this.codPedido = 0;
        this.soma = 0.00;
      }else{
        this.codPedido = response[0].codPedido;
        this.soma = response[0][0].valorTotal;
      }
    });

  }

  ngOnInit(){}

}


