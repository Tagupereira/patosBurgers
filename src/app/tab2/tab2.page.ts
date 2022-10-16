/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { ModalPage } from './../modal/modal.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Pedido,PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  pedido: Pedido[];
  pedidoData = {};
  datas;
  valorAtual = 0.00;
  valorEntrega = 0.00;
  sum = 0.00;
  cont = 0;
  senhaAdmin = 'admin';

  constructor(
    private service: PedidoService,
    public alert: AlertController,
    private modal: ModalController,
    private route: Router
  ){}

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

    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });

  }
  async abrirModal(codPedido, valor, local, preco, cliente,tipo, dataPedido){
    //this.modal.dismiss();

    if(valor > 0 ){
      const modal = await this.modal.create({
        component: ModalPage,
        componentProps: {
          cod: codPedido,
          total: valor,
          bairro: local,
          valEnt: preco,
          nomeCliente: cliente,
          tipoPag: tipo,
          data: dataPedido
        }
      });
      modal.present();
    }
  }

  public atualizaPedidos(){
    console.log("atualizou");
    this.pedidoData = this.pedido.reduce(function(acumulador, datArray){
      if(!acumulador[datArray.dataPedido]){
        acumulador[datArray.dataPedido] = [datArray.dataPedido];
      }
      acumulador[datArray.dataPedido].push(datArray);
      return acumulador;

    }, {});

    this.datas = Object.values(this.pedidoData);

    this.sum = 0.00;

    for(let i = 0; i <= this.datas[0].length; i++){

      this.valorAtual = Number(this.datas[0][i+1].valor);
      this.valorEntrega = Number(this.datas[0][i+1].preco);

      this.sum = this.valorAtual + this.valorEntrega + this.sum;

    }

  }

  public valida(){
    this.route.navigateByUrl('totais');
    if (this.cont < 3){

      if(this.cont === 2){
        const senha = prompt('Não lembra a senha? chame o administrador:');
        if(senha === null){
          this.cont =  this.cont;
        }else{

          if (senha === this.senhaAdmin){
            this.route.navigateByUrl('totais');
            this.cont = 0;
          }
          else{

            this.cont = this.cont + 1;
            alert('Acesso negado - tentativa '+ this.cont);
          }
        }

      }else{
        const senha = prompt('informe a senha:');

        if(senha === null){
          this.route.navigateByUrl('tabs/tab2');
          this.cont = this.cont;

        }else{

          if (senha === this.senhaAdmin){
            this.route.navigateByUrl('totais');
            this.cont = 0;

          }
          else{

            this.cont = this.cont + 1;
            alert('Acesso negado - tentativa '+ this.cont);
            this.route.navigateByUrl('tabs/tab2');
          }
        }
      }

    }
    else{
      const admin = prompt('Acesso bloqueado, digite a senha de Administrador');
      if (admin === this.senhaAdmin){
        this.cont = 0;
        alert('Reiniciado com sucesso');
      }
    }

  }
///// fim da validação para acesso ao totais do dia do app///////////


  ngOnInit() {}
  voltar(){
    this.route.navigateByUrl('/');
  }
}
