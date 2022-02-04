import { Produtos } from './../models/Produtos.model';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titulo = 'Balcão';
  listaProduto: Produtos[] = [
    {
      imagem:'https://i.pinimg.com/originals/81/51/95/81519508737090bc009136c3dce58a6f.jpg',
      nome: 'Combo 1',
      valor: '19,99'
    },
    {
      imagem:'https://exame.com/wp-content/uploads/2020/05/Vinil-Burger.jpg?quality=70&strip=info',
      nome: 'Combo 2',
      valor: '24,99'
    },{
      imagem:'https://s2.glbimg.com/-on4mnFlw5G3RI4sFYUyPcsE5lE=/620x466/e.glbimg.com/og/ed/f/original/2021/05/26/burger_nou.jpeg',
      nome: 'Combo 3',
      valor: '19,99'
    },
    {
      imagem:'https://i.pinimg.com/originals/81/51/95/81519508737090bc009136c3dce58a6f.jpg',
      nome: 'Combo 4',
      valor: '24,99'
    },{
      imagem:'https://exame.com/wp-content/uploads/2020/05/Vinil-Burger.jpg?quality=70&strip=info',
      nome: 'Combo 5',
      valor: '19,99'
    },
    {
      imagem:'https://s2.glbimg.com/-on4mnFlw5G3RI4sFYUyPcsE5lE=/620x466/e.glbimg.com/og/ed/f/original/2021/05/26/burger_nou.jpeg',
      nome: 'Combo 6',
      valor: '24,99'
    },
    {
      imagem:'https://i.pinimg.com/originals/81/51/95/81519508737090bc009136c3dce58a6f.jpg',
      nome: 'Combo 7',
      valor: '19,99'
    },
    {
      imagem:'https://exame.com/wp-content/uploads/2020/05/Vinil-Burger.jpg?quality=70&strip=info',
      nome: 'Combo 8',
      valor: '24,99'
    },

  ];

  constructor(public toastController: ToastController) {}
  async adicionadoToast() {
    const toast = await this.toastController.create({
      message: 'Item Adicionado.',
      duration: 2000,
      color: 'success'
    });
    toast.present();

  }
}
