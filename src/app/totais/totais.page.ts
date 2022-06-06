/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pedido,PedidoService } from './../services/pedido.service';

@Component({
  selector: 'app-totais',
  templateUrl: './totais.page.html',
  styleUrls: ['./totais.page.scss'],
})
export class TotaisPage implements OnInit, OnDestroy {
  pedido: Pedido[];
  pedidosAtuais = [];
  dinheiro = 0;
  credito = 0;
  debito = 0;
  pix = 0;
  total = 0;
  entregas = 0;
  totalEntregas = 0;
  totalDia = 0;
  dateForm;

  constructor(
    private service: PedidoService,
    private route: Router) {

    }
    ngOnInit() {
      this.zerar();
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+ 1;
    const year =  date.getFullYear();

    if (month < 10) {
      const mes = '0' + month;

      if (day < 10) {
        const dia = '0' + day;
        this.dateForm =  year +'-'+ mes +'-' + dia;

      }else{
        this.dateForm =   year +'-'+ mes +'-' + day;
      }

    }else{
      if (day < 10) {
        const dia = '0' + day;
        this.dateForm =  year +'-'+ month +'-' + dia;

      }else{
        this.dateForm = year +'-'+ month +'-' + day;
      }
    }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.service.getAll().subscribe(response =>{
      this.pedido = response;
    /////// for para adicionar dados do dia atual no array
      for (let i = 0; i < this.pedido.length; i++){
        if(this.pedido[i].dataPedido == this.dateForm){
          this.pedidosAtuais.push(this.pedido[i]);
        }
      }
    /////// for para adicionar a soma do total em dinheiro
      for (let i = 0; i < this.pedidosAtuais.length; i++){
        if(this.pedidosAtuais[i].tipo === "Dinheiro"){
          this.dinheiro = Number(this.pedidosAtuais[i].valor) + Number(this.dinheiro);
          //console.log(this.dinheiro);
        }
      }
    /////// for para adicionar a soma do total em pix
      for (let i = 0; i < this.pedidosAtuais.length; i++){
        if(this.pedidosAtuais[i].tipo === "PIX"){
          this.pix = Number(this.pedidosAtuais[i].valor) + Number(this.pix);
          //console.log(this.pix);
        }
      }
    /////// for para adicionar a soma do total em credito
      for (let i = 0; i < this.pedidosAtuais.length; i++){
        if(this.pedidosAtuais[i].tipo === "Credito"){
          this.credito = Number(this.pedidosAtuais[i].valor) + Number(this.credito);
          //console.log(this.credito);
        }
      }
    /////// for para adicionar a soma do total em debito
      for (let i = 0; i < this.pedidosAtuais.length; i++){
        if(this.pedidosAtuais[i].tipo === "Debito"){
          this.debito = Number(this.pedidosAtuais[i].valor) + Number(this.debito);
          //console.log(this.debito);
        }
      }
    ////// soma todos os valores
      this.total = Number(this.pix + this.dinheiro + this.debito + this.credito);

    ///// for para a area das entregas
    for (let i = 0; i < this.pedidosAtuais.length; i++){
        if(this.pedidosAtuais[i].idEntrega > 1){
         this.entregas++;
         this.totalEntregas = Number(this.pedidosAtuais[i].preco) + Number(this.totalEntregas);
        }
      }

      this.totalDia = this.total + this.totalEntregas;

      this.pedidosAtuais=[];
    });


    }

  ionViewDidEnter() {
    this.noBack();

  }
// função para zerar o valor das variaveis evitando duplicação de valores
  public zerar(){
    this.dinheiro = 0;
    this.credito = 0;
    this.debito = 0;
    this.pix = 0;
    this.total = 0;
    this.entregas = 0;
    this.totalEntregas = 0;
    this.totalDia = 0;
  }

  public fechar(){

    this.route.navigateByUrl('tabs/tab2');

  }
  noBack(){
    //esta função bloqueia o botao back no app
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL);
    });
  }

  ngOnDestroy(): void {
    this.noBack();
    this.zerar();

  }


}
