import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { PdfMakerService } from 'src/app/services/pdf-maker.service';
@Component({
  selector: 'app-punto-siete',
  templateUrl: './punto-siete.page.html',
  styleUrls: ['./punto-siete.page.scss'],
})
export class PuntoSietePage implements OnInit {
  datos:any={
    curso:'',
    difusion:false,
    interno:false,
    externo:false,
    nombreCurso:'',
    lugar:'',
    facilitador:'',
    empresa:''
  }

  @ViewChild('slider') slider: IonSlides

  constructor(private alertCtrl: AlertController,private pdfMaker: PdfMakerService) { }

  ngOnInit() {
    // this.slider.lockSwipes(true);
  }
  pdf(){
var dd = {
  //   background: function(currentPage, pageSize) {
  //   return {image: 'sampleImage.jpg', width: 400,height: 500, absolutePosition: {x: 60, y: 100},opacity: 0.5}
  // },
    header: function(){
      return {
          table: { widths: [560],heights:[40,0,0],
body: [

    [{text:''}],
    [{text:'VII. COMUNICACIÓN, PARTICIPACIÓN Y CONSULTA',alignment:'center',bold:true}],
    [{text:'LISTA DE COMUNICACIÓN',alignment:'center',bold:true,fillColor:'#ddd'}],
]

}, margin: [22,15]
      };
    },
    footer: function(){
      return {
          table:{
   headerRows:1, 
   widths: [560],
             body : [
             [''],
             [''],
             ['']
                 ]
        }, layout : 'headerLineOnly',
          margin: [30,100]
      };
    },
    
    content:[
            {
                columns: [
				[    //Primera columna
				    {
				        text:'Curso'
				    },{
				        table:{ widths: [10],heights:[10],
				            body:[
				                [
				                    {
				                      text:`${this.datos.curso}`  
				                    }]
				                ]
				        }
				    }],[
				        //Segunda columna  
				        {
				        text:'Difusión'
				    },{
				        table:{ widths: [10],heights:[10],
				            body:[
				                [
				                    {
				                      text:`${this.datos.difusion}`  
				                    }]
				                ]
				        }
				    }
				        ],//Tercera columna
				        [
				            {
				        text:'Interno'
				    },{
				        table:{ widths: [10],heights:[10],
				            body:[
				                [
				                    {
				                       text:`${this.datos.interno}` 
				                    }]
				                ]
				        }
				    }],//Cuarta columna
				        [
				            {
				        text:'Externo'
				    },{
				        table:{ widths: [10],heights:[10],
				            body:[
				                [
				                    {
				                      text:`${this.datos.externo}`  
				                    }]
				                ]
				        }
				    }],//Quinta columna
				    [
				        {
				        text:'Fecha'
				    },{
				        table:{ widths: [100],heights:[10],
				            
				            body:[
				                [
				                    {text:''}]
				                ]
				        }
				    }],//Linea para la fecha
				    
				    
				
		      	],
                
            },{text:'\n\n'},{
                table:{
                         widths: [560,560,560,560,560],heights:[10,10,10,10,10,10],
                    body:[
                        [{text:'Nombre del Curso o documento:',bold:true}],
                        [{text:`${this.datos.nombreCurso}`}],
                        [{text:`Lugar: ${this.datos.lugar}`,bold:true}],
                        [{text:`Facilitador: ${this.datos.facilitador}`,bold:true}],
                        [{text:`Empresa: ${this.datos.empresa}`,bold:true}],
                        
                        ]
                }
            },{text:'\n'},{
                table:{
                        widths: [20,250,160,100],
                        heights:[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                    body:[
                       [{text:'No.'},{text:'Nombre'},{text:'Cargo'},{text:'Firma'}],
                       [{text:'1'},{text:''},{text:''},{text:''}],
                       [{text:'2'},{text:''},{text:''},{text:''}],
                       [{text:'3'},{text:''},{text:''},{text:''}],
                       [{text:'4'},{text:''},{text:''},{text:''}],
                       [{text:'5'},{text:''},{text:''},{text:''}],
                       [{text:'6'},{text:''},{text:''},{text:''}],
                       [{text:'7'},{text:''},{text:''},{text:''}],
                       [{text:'8'},{text:''},{text:''},{text:''}],
                       [{text:'9'},{text:''},{text:''},{text:''}],
                       [{text:'10'},{text:''},{text:''},{text:''}],
                       [{text:'11'},{text:''},{text:''},{text:''}],
                       [{text:'12'},{text:''},{text:''},{text:''}],
                       [{text:'13'},{text:''},{text:''},{text:''}],
                       [{text:'14'},{text:''},{text:''},{text:''}],
                       [{text:'15'},{text:''},{text:''},{text:''}],
                       [{text:'16'},{text:''},{text:''},{text:''}],
                       [{text:'17'},{text:''},{text:''},{text:''}],
                       [{text:'18'},{text:''},{text:''},{text:''}],
                       [{text:'19'},{text:''},{text:''},{text:''}],
                       [{text:'20'},{text:''},{text:''},{text:''}],
        
                       
                        ]
                }
            }
        
         ]
   ,
   
    pageSize: 'LETTER',
    pageMargins: [22,110]
};

this.pdfMaker.generate(dd,'Punto 7');
  }
}
