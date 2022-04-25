/* eslint-disable curly */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido, PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})

export class EntregasPage implements OnInit {
  titulo ='Entregas';
  pedido: Pedido[];
  pedidoData = {};
  datas;
  entregas;


  constructor(private service: PedidoService,
    private route: ActivatedRoute,
    private rota: Router,){}

  doRefresh(event){
    setTimeout(() => {
      this.service.getAll().subscribe(response =>{
        this.pedido = response;
        this.atualizaPedidos();
      });
      event.target.complete();
    }, 800);
  }

  ionViewDidEnter() {
    this.service.getAll().subscribe(response =>{
      this.pedido = response;
      this.atualizaPedidos();
    });
  }

  public atualizaPedidos(){

    this.pedidoData = this.pedido.reduce(function(acumulador, datArray){
      if(!acumulador[datArray.dataPedido]){
        acumulador[datArray.dataPedido] = [datArray.dataPedido];
      }
      acumulador[datArray.dataPedido].push(datArray);

      return acumulador;

    }, {});



    this.datas = Object.values(this.pedidoData);
  }

  public fechar(){
    this.rota.navigateByUrl('/tabs/tab1');
  }

  ngOnInit() {}

}
