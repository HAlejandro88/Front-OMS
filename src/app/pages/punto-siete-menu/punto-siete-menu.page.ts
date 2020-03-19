import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-punto-siete-menu',
  templateUrl: './punto-siete-menu.page.html',
  styleUrls: ['./punto-siete-menu.page.scss'],
})
export class PuntoSieteMenuPage implements OnInit {

  constructor(
    private navCtrl: NavController) { }

  ngOnInit() {
  }
  goListaComunicacion() {
    this.navCtrl.navigateForward('/punto-siete');
  }
  goPuntoQuejasSugerencias() {
    this.navCtrl.navigateForward('/punto-siete-quejas');
  }
  goPuntoRegistrosControl() {
    this.navCtrl.navigateForward('/punto-siete-registro');
  }
  goPuntoProcedimiento() {
    this.navCtrl.navigateForward('/punto-siete-procedimiento');
  }
  goPuntoEvidencia() {
    this.navCtrl.navigateForward('/punto-siete-evidencia');
  }

}
