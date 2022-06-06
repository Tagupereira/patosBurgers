import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{



  burger='./assets/icon_tabs/fast-food.svg';
  pedido='./assets/icon_tabs/list.svg';
  carrinho='./assets/icon_tabs/cart.svg';
  entrega='./assets/icon_tabs/bicycle.svg';

  constructor() {
  }

  ngOnInit(){}

}




