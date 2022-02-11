
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Pedido, PedidosService } from '../services/pedidos.service';




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  msg: string;

  pedidos: Pedido[];


  constructor(public alertController: AlertController,
    public toastController: ToastController,
    private route: Router,
    private service: PedidosService
    ) {


    }

  ngOnInit(){

    this.service.getAll().subscribe(response =>{
      this.pedidos = response;
    });

 }

 delete(idCarrinho: any){

  this.service.remove(idCarrinho).subscribe(() =>{

    this.service.getAll().subscribe(response =>{
      this.pedidos = response;
    });
  });

 }


// codigo do refresh --------------------------------
 doRefresh(event) {

  setTimeout(() => {
    this.service.getAll().subscribe(response =>{
      this.pedidos = response;
    });

    event.target.complete();
  }, 800);
}



// codigos toast alert --------------------------------------------------
  async excluir(idPedido) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Excluir Item',
      message: 'Deseja cancelar esse item?',
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
            this.delete(idPedido);

            this.canceladoToast();
          }
        }
      ]
    });
    await alert.present();
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
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Sim',
            id: 'confirm-button',
            handler: () => {
              this.msg='Pedido excluido';
              this.canceladoToast();

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
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }

}
