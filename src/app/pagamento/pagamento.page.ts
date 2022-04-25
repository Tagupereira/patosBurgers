/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ModalController, ToastController } from '@ionic/angular';
import { Entrega, PagamentoService } from './../services/pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  listaEntregas: Entrega[];
  msg: string;
  color: string;
  dados: any;

  valEnt = 0.00;
  somaIni;
  soma;
  codPedido;
  recebeEntrega;
  idEntrega;

  pagamento: string;
  codPagamento: string;
  nomeCliente: string;

  constructor( private route: ActivatedRoute,
    private rota: Router,
    private pay: PagamentoService,
    public toast: ToastController,
    private modal: ModalController,
    ) {

    }

    ionViewDidEnter() {

      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function() {
          history.pushState(null, null, document.URL);
      });

      this.pay.buscaEntregas().subscribe(response =>{

        this.listaEntregas = response;

      });

      this.pagamento='';
      this.codPagamento='';
      this.nomeCliente='';
      this.pagamento='Informe o pagamento -';
      this.valEnt = 0;
      this.soma = this.somaIni;

    }

  public fecharPagamento(){

    this.rota.navigateByUrl('/tabs/tab3');
    this.valEnt = 0;

  }

  public nome(evento: any){
    const cliente1 = evento.target.value.toLowerCase();
    const cliente2 = cliente1[0].toUpperCase() + cliente1.substr(1);
    this.nomeCliente = cliente2;
  }

  public preco(e){

    this.soma=0;
    this.soma = this.somaIni;
    const idEntrega = e.target.value;
    this.idEntrega = idEntrega;

    for(let i = 0 ; i < this.listaEntregas.length; i++ ){

      if (this.listaEntregas[i].idEntrega === idEntrega){
        this.recebeEntrega = this.listaEntregas[i].valor;
      }
    }

    const intEntrega = Number(this.recebeEntrega);
    const intSoma = Number(this.soma);

    this.soma = intEntrega + intSoma;
  }

  recebePagamento(tipo: string, cod: string){
    this.pagamento = tipo;
    this.codPagamento = cod;
  }

  async finaliza(){
    if(this.nomeCliente && this.nomeCliente !== ''){
      if(this.pagamento !== 'Informe o pagamento -'){
        if(this.idEntrega){
          this.dados = {
            codPedido: this.codPedido,
            cliente: this.nomeCliente,
            valorPedido: this.soma,
            codPagamento:this.codPagamento,
            idEntrega: this.idEntrega
          };

          this.pay.pagar(this.dados, this.codPedido).subscribe(response =>{
          });

          this.msg='Pedido Concluido com sucesso!';
          this.color='success';
          this.verificaToast();
          this.rota.navigateByUrl('/tabs');

        }else{
          this.msg='Informe uma forma de entrega';
          this.color='danger';
          this.verificaToast();
        }
      }else{

        this.msg='Informe uma forma de pagamento';
        this.color='danger';
        this.verificaToast();
      }
    }else{
      this.msg='Informe o nome do cliente';
      this.color='danger';
      this.verificaToast();
    }

  }

  async verificaToast() {

    const toast = await this.toast.create({
      message: this.msg,
      duration: 2000,
      color: this.color,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
    this.pagamento='Informe o pagamento -';
    this.route.params.subscribe( parametros => {
      if (parametros.codPedido) {
        this.codPedido = parametros.codPedido;
        this.somaIni = parametros.soma;
        this.soma = this.somaIni;
      }
    });
  }

}
