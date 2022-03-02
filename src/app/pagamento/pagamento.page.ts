import { ToastController } from '@ionic/angular';
import { PagamentoService } from './../services/pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {
  soma;
  codPedido;
  pagamento: string;
  codPagamento: string;
  nomeCliente: string;

  msg: string;
  color: string;

  dados: any;

  constructor( private route: ActivatedRoute,
    private rota: Router,
    private pay: PagamentoService,
    public toast: ToastController) {}

  fecharPagamento(){
    this.rota.navigateByUrl('/tabs/tab3');
  }

  nome(evento: any){

    const cliente1 = evento.target.value.toLowerCase();
    const cliente2 = cliente1[0].toUpperCase() + cliente1.substr(1);

    this.nomeCliente = cliente2;

  }

  recebePagamento(tipo: string, cod: string){
    this.pagamento = tipo;
    this.codPagamento = cod;
  }

  async finaliza(){

    if(this.nomeCliente && this.nomeCliente !== ''){
      if(this.pagamento !== 'Informe o pagamento'){

        this.dados = {
          codPedido: this.codPedido,
          cliente: this.nomeCliente,
          valorPedido: this.soma,
          codPagamento:this.codPagamento
        };

        this.pay.pagar(this.dados, this.codPedido).subscribe(response =>{
        });
        this.msg='Pedido Concluido com sucesso!';
        this.color='success';
        this.verificaToast();
        this.rota.navigateByUrl('/tabs');

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

  ngOnInit() {
    this.pagamento='Informe o pagamento';
    this.route.params.subscribe( parametros => {
      if (parametros.codPedido) {
        this.codPedido = parametros.codPedido;
        this.soma = parametros.soma;
      }
    });

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


}
