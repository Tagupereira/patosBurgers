import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  burger='./assets/icon_tabs/fast-food.svg';
  pedidos='./assets/icon_tabs/list.svg';
  carrinho='./assets/icon_tabs/cart.svg';

  constructor() {}

  ngOnInit(){}

}


