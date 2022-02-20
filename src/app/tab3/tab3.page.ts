
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Pedido, PedidosService } from '../services/carrinho.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  msg: string;
  pedidos: Pedido[];
  codPedido=0;
  soma=0.00;
  colorToast: string;

  constructor(public alertController: AlertController,
    public toastController: ToastController,
    private route: Router,
    private service: PedidosService,
    private rotaParams: ActivatedRoute
    ) {

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

  // função para excluir 1 item do carrinho
  delete(idCarrinho){

    this.service.remove(idCarrinho).subscribe(() =>{
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
    });
  }

// exclui todos os itens do carrinho
  excluirCarrinho(codPedido){

    this.service.excluirCarrinho(codPedido).subscribe(() =>{
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
    });
  }

// codigos toast alert --------------------------------------------------
  async excluir(idCarrinho, produto) {

      const alert = await this.alertController.create({
        header: 'Excluir Item',
        message: 'Deseja excluir '+ produto + '?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button'
          }, {
            text: 'Sim',
            id: 'confirm-button',
            handler: () => {
              this.msg='Item Excluido';
              this.colorToast = 'danger';
              this.delete(idCarrinho);
              this.canceladoToast();
            }
          }
        ]
      });
      await alert.present();
  }

  verifica(){

    this.service.getAll().subscribe(response =>{
      if(response.length <= 0){
        this.msg='Carrinho não Possui itens';
        this.colorToast = 'warning';
        this.canceladoToast();
      }else{
        this.cancelar();
      }
    });
  }

  async cancelar() {

        const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cancelar Pedido',
        message: 'Deseja cancelar esse Pedido?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
          }, {
            text: 'Sim',
            id: 'confirm-button',
            handler: () => {
              this.msg='Pedido excluido';
              this.colorToast = 'danger';
              this.canceladoToast();
              this.excluirCarrinho(this.codPedido);
              this.route.navigateByUrl('/tabs/tab1');
            }
          }
        ]
      });
    await alert.present();
  }

  async canceladoToast() {

    const toast = await this.toastController.create({
      message: this.msg,
      duration: 1000,
      color: this.colorToast,
      position: 'top'
    });
    toast.present();
  }

  pagamento(){
    if(this.codPedido > 0){
      this.route.navigateByUrl('/pagamento/'+ this.codPedido+'/'+this.soma);
    }
    else{
      this.msg = 'Carrinho vazio!';
      this.colorToast = 'warning';
      this.canceladoToast();
    }
  }

  ngOnInit(){

    this.service.getAll().subscribe(response =>{
      this.pedidos = response;
      this.soma = this.soma;
    });

  setInterval(()=> {
      this.service.getAll().subscribe(response =>{
        this.pedidos = response;
        this.soma = this.soma;
        //console.log('atualizou');
        if(response.length <= 0){
          this.codPedido = 0;
          this.soma = 0.00;
        }else{
          this.codPedido = response[0].codPedido;
          this.soma = response[0][0].valorTotal;
        }
      });
    },1000);

  }





}
