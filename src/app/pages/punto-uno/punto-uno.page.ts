import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditPoliticaPage } from '../edit-politica/edit-politica.page';
import { PdfMakerService } from 'src/app/services/pdf-maker.service';
import { AlertController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-punto-uno',
  templateUrl: './punto-uno.page.html',
  styleUrls: ['./punto-uno.page.scss'],
})
export class PuntoUnoPage implements OnInit {

  @ViewChild('slider') slider: IonSlides
  @ViewChild('slider1') slider2: IonSlides

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private pdfMakerService: PdfMakerService
  ) { }

  ngOnInit() {
    this.slider.lockSwipes(true);
    this.slider2.lockSwipes(true);
  }

  async showEdit() {
    const modal = await this.modalCtrl.create({
      component: EditPoliticaPage,
    });

    modal.present();
  }

  goNext(){
    this.slider2.lockSwipes(false)
    this.slider2.slideNext();
    this.slider2.lockSwipes(true)
  }

  goBack() {
    this.slider2.lockSwipes(false)
    this.slider2.slidePrev();
    this.slider2.lockSwipes(true)
  }

  async elegirPolitica() {
    const alert = await this.alertCtrl.create({
      header: 'Importante',
      message: '<strong>Esta es la política que estará en tu sistema</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  segmentChanged(event) {
    const value = event.detail.value;
    
    if(value === "form") {
      this.slider.lockSwipes(false);
      this.slider.slideTo(1);
      this.slider.lockSwipes(true);
    } else if(value === "proced"){
      this.slider.lockSwipes(false);
      this.slider.slideTo(0);
      this.slider.lockSwipes(true);
    }
  }

  downloadPolitica(){
    const dd = {
      header: function(){
        return {
              table: {widths: [320, 20, 200],
              heights: [30,10,10],
          body: [
            [{text:`lorem`,colSpan:3,bold:true},{},{}],
            [{text:'kfkfkfkkffk',colSpan:3},{},{}],
            [{text:'1.Politica',colSpan:3,alignment: 'center'},{},{}]
          ]
        }, margin: [22,20]
        };
      },
      footer: function(){
        return {
            table:{
          headerRows:1, 
          widths: [510],
               body : [
               [''],
               [''],
               ['']
                   ]
             }, layout : 'headerLineOnly',
            margin: [72,40]
        };
      },
      
      content:[
          {text: new Date().toTimeString()},
          {
              text:`POLITICA`,bold:true,alignment: 'center',Style:'header',fontSize:25
          },{
             text:'\n\n\nEn la Estación Servicio “Servicio El Carril S.A. de C.V.” conscientes con la naturaleza de los peligros y aspectos ambientales asociados a las actividades propias de la instalación, trabajadores y contratistas estamos comprometidos en mejorar nuestro desempeño en materia de Seguridad Industrial, Seguridad Operativa y Protección del medio ambiente, en todos los niveles de la organización, juntos orientamos nuestros esfuerzos para la evaluación, reducción y control de los riesgos e impactos ambientales, el cumplimiento normativo, mediante un proceso de mejora continua.\n\n' 
             ,fontSize:17,alignment:'justify'
          },
          //lineas para la firma
            {
        style: 'tableExample',
        table: {widths: [200], headerRows:1, 
          body: [
            [''],
            [{text:'REPRESENTANTE LEGAL',alignment:'center'}],
            ['']
          ]
        },layout : 'headerLineOnly',
            margin: [150,40],
      }
          
          ]
     ,
      pageSize: 'LETTER',
      pageMargins: [72,150]
    };
    this.pdfMakerService.generate(dd, 'I. Política.pdf');
  }

}