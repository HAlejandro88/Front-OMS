import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-fs20-dispensarios',
  templateUrl: './fs20-dispensarios.page.html',
  styleUrls: ['./fs20-dispensarios.page.scss'],
})
export class Fs20DispensariosPage implements OnInit {
  datos:any={
    c1C1:false,
    c2C1:false,
    c3C1:false,
    c4C1:false,
    c5C1:false,
    c6C1:false,
    c7C1:false,
    c8C1:false,
    c9C1:false,
    c10C1:false,
    c11C1:false,
    c12C1:false,
    c1C2:false,
    c2C2:false,
    c3C2:false,
    c4C2:false,
    c5C2:false,
    c6C2:false,
    c7C2:false,
    c8C2:false,
    c9C2:false,
    c10C2:false,
    c11C2:false,
    c12C2:false,
    c1C3:false,
    c2C3:false,
    c3C3:false,
    c4C3:false,
    c5C3:false,
    c6C3:false,
    c7C3:false,
    c8C3:false,
    c9C3:false,
    c10C3:false,
    c11C3:false,
    c12C3:false,
    c1C4:false,
    c2C4:false,
    c3C4:false,
    c4C4:false,
    c5C4:false,
    c6C4:false,
    c7C4:false,
    c8C4:false,
    c9C4:false,
    c10C4:false,
    c11C4:false,
    c12C4:false,
    c1C5:false,
    c2C5:false,
    c3C5:false,
    c4C5:false,
    c5C5:false,
    c6C5:false,
    c7C5:false,
    c8C5:false,
    c9C5:false,
    c10C5:false,
    c11C5:false,
    c12C5:false,
    c1C6:false,
    c2C6:false,
    c3C6:false,
    c4C6:false,
    c5C6:false,
    c6C6:false,
    c7C6:false,
    c8C6:false,
    c9C6:false,
    c10C6:false,
    c11C6:false,
    c12C6:false,
    c1C7:false,
    c2C7:false,
    c3C7:false,
    c4C7:false,
    c5C7:false,
    c6C7:false,
    c7C7:false,
    c8C7:false,
    c9C7:false,
    c10C7:false,
    c11C7:false,
    c12C7:false,
    c1C8:false,
    c2C8:false,
    c3C8:false,
    c4C8:false,
    c5C8:false,
    c6C8:false,
    c7C8:false,
    c8C8:false,
    c9C8:false,
    c10C8:false,
    c11C8:false,
    c12C8:false,
    c1C9:false,
    c2C9:false,
    c3C9:false,
    c4C9:false,
    c5C9:false,
    c6C9:false,
    c7C9:false,
    c8C9:false,
    c9C9:false,
    c10C9:false,
    c11C9:false,
    c12C9:false,
    c1C10:false,
    c2C10:false,
    c3C10:false,
    c4C10:false,
    c5C10:false,
    c6C10:false,
    c7C10:false,
    c8C10:false,
    c9C10:false,
    c10C10:false,
    c11C10:false,
    c12C10:false,
    c1C11:false,
    c2C11:false,
    c3C11:false,
    c4C11:false,
    c5C11:false,
    c6C11:false,
    c7C11:false,
    c8C11:false,
    c9C11:false,
    c10C11:false,
    c11C11:false,
    c12C11:false,
    c1C12:false,
    c2C12:false,
    c3C12:false,
    c4C12:false,
    c5C12:false,
    c6C12:false,
    c7C12:false,
    c8C12:false,
    c9C12:false,
    c10C12:false,
    c11C12:false,
    c12C12:false,
  }
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goPuntoOnceFs20(){
    console.log('esta vivo');
    this.navCtrl.navigateForward('/fs20')
  }

  enviarForm(formulario){
    console.log(this.datos);
    
  }
}
