import { EstacionServicioDatosService } from './../../services/estacion-servicio-datos.service';
import { IconoEstacionService } from './../../services/iconosEstacion.service';
import { FirmaEstacionServiceService } from './../../services/firma-estacion-service.service';
import { MarcaAguaServiceService } from './../../services/marca-agua-service.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PdfMakerService } from 'src/app/services/pdf-maker.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-punto-catorce',
  templateUrl: './punto-catorce.page.html',
  styleUrls: ['./punto-catorce.page.scss'],
})
export class PuntoCatorcePage implements OnInit {

  myImage = null;
  firmaEstacion = null;
  iconoEstacion = null;
  marcaAguaEstacion = null;
  datosEstacion: any = {
    calleNumero: '',
    ciudad: '',
    colonia: '',
    correoElectronico: '',
    cp: '',
    estado: '',
    gerenteEstacion: '',
    maximaAutoridad: '',
    nombreEstacionServicio: '',
    representanteTecnico: '',
    telefono: ''
  };

  constructor(
    private navCtrl: NavController,
    private pdfMaker: PdfMakerService,
    private marca: MarcaAguaServiceService,
    private firma: FirmaEstacionServiceService,
    private icono: IconoEstacionService,
    private datosEstacionService: EstacionServicioDatosService
    ) { this.getDatosEstacion(); }

  ngOnInit() {
    this.imagen64();
    this.marcaAgua();
    this.getFirma();
    this.getIcono();
  }
  goCatorceProcedimiento() {
    this.navCtrl.navigateForward('/punto-catorce-procedimiento');
  }

  goCatorcePrograma() {
    this.navCtrl.navigateForward('/punto-catorce-programa');
  }

  goCatorceResultado() {
    this.navCtrl.navigateForward('/punto-catorce-resultado');
  }

  goCatorceEvaluacion() {
    this.navCtrl.navigateForward('/punto-catorce-evaluacion');
  }

  goCatorcePlan() {
    this.navCtrl.navigateForward('/punto-catorce-plan');
  }

  goCatorceEvidencia() {
    this.navCtrl.navigateForward('/punto-catorce-evidencia');
  }

  getDatosEstacion() {
    this.datosEstacionService.getEstacion().subscribe((data: any) => {
      // console.log(data.findEstacion[data.findEstacion.length -1]);
      this.datosEstacion = data.findEstacion[data.findEstacion.length - 1];
    });
  }
  getIcono() {
    this.icono.getPolitica().subscribe((data: any ) => {
      console.log(data);
      this.iconoEstacion =  data.findPolitica[data.findPolitica.length - 1].imagen;
    });
  }

  getFirma() {
    this.firma.getFirmaEstacion().subscribe((data: any) => {
      // console.log(data);
      this.firmaEstacion = this.firma = data.findFirma[data.findFirma.length - 1].firma;
    });
  }

  marcaAgua() {
    return this.marca.getMarcaAgua().subscribe((data: any) => {
      // console.log(data.findMarcaAgua[data.findMarcaAgua.length - 1].marcaAgua);
      this.marcaAguaEstacion = data.findMarcaAgua[data.findMarcaAgua.length - 1].marcaAgua;
    });
  }

  imagen64() {
    this.convertFileDataURLviaFileReader(`../../../assets/FondosEstilos/copyright_footer-07.png`).subscribe(
      base64 => {
        this.myImage = base64;
      }
    );
  }

  convertFileDataURLviaFileReader(url: string) {
    return Observable.create(observer => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function() {
        const reader: FileReader = new FileReader();
        reader.onloadend = function() {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  pdf() {
    const fecha = new Date();
    const day = fecha.getDate();
    const month = fecha.getUTCMonth() + 1;
    const year = fecha.getFullYear();
    const marcaAgua = this.marcaAguaEstacion;
    const iconoEstacion = this.iconoEstacion;
    const firmaEstacion = this.firmaEstacion;
    const footer = this.myImage;
    const ddd = this.datosEstacion;
    const dd = {
      userPassword: '123',
      ownerPassword: '123456',
      permissions: {
        printing: 'highResolution', // 'lowResolution'
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true
      },
      background() {
        return {
          image: `${marcaAgua}`, width: 290, height: 400,
          absolutePosition: {x: 250, y: 120}, opacity: 0.4
        };
      },
      header(currentPage, pageSize) {
        return {
          table: {
            widths: [150, 590],
            heights: [30, 10, 10],
            body: [
              [
                {
                  image: `${iconoEstacion}`,
                  width: 45,
                  height: 60,
                  alignment: 'center',
                  border: [true, true, false, true],
                },
                {
                  text: `${ddd.nombreEstacionServicio}`, bold: true, fontSize: 25, alignment: 'center', margin: [15, 20],
                  border: [false, true, true, true],
                }
              ],
              [
                {
                  text: 'XIV. MONITOREO, VERIFICACIÓN Y EVALUACIÓN',
                  alignment: 'center',
                  bold: true,
                  colSpan: 2
                }
              ],
              [
                {
                  text: `PROGRAMA DE MONITOREO Y MEDICIÓN DE PARÁMETROS DE DESEMPEÑO`,
                  alignment: 'center',
                  bold: true,
                  fillColor: '#ddd',
                  colSpan: 2
                }
              ],
            ]
          },
          margin: [22, 15],
        };
      },
      footer(currentPage, pageCount) {
        return {
          table: {
            headerRows: 1,
            widths: [650],
            body : [
              [
                {
                  columns: [
                    'Página' + currentPage.toString() + ' de ' + pageCount,
                    {text: `FS-29 Rev. 0,  ${day}/${month}/${year}`, width: 180}
                  ]
                }
              ],
              [
                {
                  image: `${footer}`,
                  pageBreak: 'after',
                  width: 650,
                  height: 60
                }
              ],
              [''],
            ]
          },
          layout : 'headerLineOnly',
          margin: [50, 20]
        };
      },
      content: [
        {
          table: {
            widths: [49, 240, 150, 70, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            body: [
              [
                {text: 'SIGLA', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 10, rowSpan: 2},
                {text: 'Indicador', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 10, rowSpan: 2},
                {text: 'Proceso, área o actividad', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 10, rowSpan: 2},
                {text: 'Criterio de aceptación', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 10, rowSpan: 2},
                {text: '2020', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 10, colSpan: 12},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {},
                {},
                {},
                {},
                {text: 'E', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'F', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'M', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'A', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'M', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'J', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'J', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'A', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'S', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'O', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'N', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
                {text: 'D', alignment: 'center', bold: true, fillColor: '#ddd', fontSize: 8},
              ],
              [
                {text: 'I.F.', fontSize: 10, alignment: 'center'},
                {text: 'ÍNDICE DE FRECUENCIA', fontSize: 10},
                {text: 'SEGURIDAD', fontSize: 10},
                {text: '0', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I.G.', fontSize: 10, alignment: 'center'},
                {text: 'ÍNDICE DE GRAVEDAD', fontSize: 10},
                {text: 'SEGURIDAD', fontSize: 10},
                {text: '0', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'ICR', fontSize: 7}
                  ]
                },
                {text: 'CUMPLIMIENTO DE ICR´s', fontSize: 10},
                {text: 'SEGURIDAD', fontSize: 10},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'CAP', fontSize: 7}
                  ]
                },
                {text: 'ÍNDICE DE CAPACITACIÓN PROCEDIMIENTOS', fontSize: 10},
                {text: 'SEGURIDAD, OPERACIÓN', fontSize: 10},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'SIM', fontSize: 7}
                  ]
                },
                {text: 'CUMPLIMIENTO PROGRAMA DE SIMULACROS', fontSize: 10},
                {text: 'SEGURIDAD', fontSize: 10},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'RES', fontSize: 7}
                  ]
                },
                {text: 'DISPOSICIÓN DE RESIDUOS', fontSize: 10},
                {text: 'PROTECCIÓN AMBIENTAL', fontSize: 10},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'IM', fontSize: 7}
                  ]
                },
                {text: 'CUMPLIMIENTO PROG. MANTTO.', fontSize: 10},
                {text: 'SEGURIDAD, PROTECC. AMBIENTAL', fontSize: 9},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'HA', fontSize: 7}
                  ]
                },
                {text: 'ATENCIÓN HALLAZGOS AUDITORÍA', fontSize: 10},
                {text: 'SEGURIDAD, PROTECC. AMBIENTAL', fontSize: 9},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'PE', fontSize: 7}
                  ]
                },
                {text: 'PRUEBAS DE EQUIPOS DE SEGURIDAD', fontSize: 10},
                {text: 'PROTECCIÓN AMBIENTAL', fontSize: 10},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'REC', fontSize: 7}
                  ]
                },
                {text: 'ATENCIÓN RECOMENDACIONES', fontSize: 10},
                {text: 'SEGURIDAD, PROTECC. AMBIENTAL', fontSize: 9},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'RG', fontSize: 7}
                  ]
                },
                {text: 'CUMPLIENTO DE REQUISITOS LEGALES', fontSize: 10},
                {text: 'SEGURIDAD, PROTECC. AMBIENTAL', fontSize: 9},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'AAS', fontSize: 7}
                  ]
                },
                {text: 'CONTAMINACIONES (AIRE, AGUA, SUELO)', fontSize: 10},
                {text: 'PROTECCIÓN AMBIENTAL', fontSize: 10},
                {text: '0', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'LIM', fontSize: 7}
                  ]
                },
                {text: 'PROGRAMA DE LIMPIEZA', fontSize: 10},
                {text: 'SEGURIDAD, PROTECC. AMBIENTAL', fontSize: 9},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'PH', fontSize: 7}
                  ]
                },
                {text: 'PRUEBAS DE HERMETICIDAD', fontSize: 10},
                {text: 'SEGURIDAD, OPERACIÓN', fontSize: 10},
                {text: '1', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {
                  fontSize: 10,
                  alignment: 'center',
                  text: [
                    'I.',
                    {text: 'CO', fontSize: 7}
                  ]
                },
                {text: 'CUMPLINIENTO DE COMUNICACIONES', fontSize: 10},
                {text: 'SEGURIDAD', fontSize: 10},
                {text: '100', fontSize: 10, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
            ]
          }
        },
        {text: '\n\n'},
        {
          table: {
            widths: [260, 260],
            body: [
              [
                {
                  image: `${firmaEstacion}`,
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                },
                {
                  text: '',
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                }
              ],
              [
                {
                  text: `REVISADO POR:\n ${ddd.representanteTecnico} \n REPRESENTANTE TÉCNICO`,
                  alignment: 'center',
                  fontSize: 9,
                  border: [true, false, true, true]
                },
                {
                  text: `APROBADO POR:\n${ddd.maximaAutoridad}\nMAXIMA AUTORIDAD`,
                  alignment: 'center',
                  fontSize: 9
                }
              ]
            ]
          },
          margin: [110, 5]
        }
      ],
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
      pageMargins: [22, 120]
    };
    this.pdfMaker.generate(dd, 'Programa de Monitoreo');
  }

  pdf2() {
    const fecha = new Date();
    const day = fecha.getDate();
    const month = fecha.getUTCMonth() + 1;
    const year = fecha.getFullYear();
    const marcaAgua = this.marcaAguaEstacion;
    const iconoEstacion = this.iconoEstacion;
    const firmaEstacion = this.firmaEstacion;
    const footer = this.myImage;
    const ddd = this.datosEstacion;
    const dd = {
      userPassword: '123',
      ownerPassword: '123456',
      permissions: {
        printing: 'highResolution', // 'lowResolution'
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true
      },
      background() {
        return {
          image: `${marcaAgua}`, width: 290, height: 400,
          absolutePosition: {x: 250, y: 120}, opacity: 0.4
        };
      },
      header() {
        return {
          table: {
            widths: [150, 590],
            heights: [30, 10, 10],
            body: [
              [
                {
                  image: `${iconoEstacion}`,
                  width: 45,
                  height: 60,
                  alignment: 'center',
                  border: [true, true, false, true],
                },
                {
                  text: `${ddd.nombreEstacionServicio}`, bold: true, fontSize: 25, alignment: 'center', margin: [15, 20],
                  border: [false, true, true, true],
                }
              ],
              [
                {
                  text: 'XIV. PREPARACIÓN Y RESPUESTA A EMERGENCIAS',
                  alignment: 'center',
                  bold: true,
                  colSpan: 2
                },
                {}
              ],
              [
                {
                  text: 'RESULTADO DEL MONITOREO Y MEDICIÓN DE PARÁMETROS DE DESEMPEÑO',
                  alignment: 'center',
                  bold: true,
                  fillColor: '#ddd',
                  colSpan: 2
                },
                {}
              ],
            ]
          },
          margin: [22, 15],
        };
      },
      footer(currentPage, pageCount) {
        return {
          table: {
            headerRows: 1,
            widths: [650],
            body : [
              [
                {
                  columns: [
                    'Página' + currentPage.toString() + ' de ' + pageCount,
                    {text: `FS-30 Rev. 0,  ${day}/${month}/${year}`, width: 180}
                  ]
                }
              ],
              [
                {
                  image: `${footer}`,
                  pageBreak: 'after',
                  alignment: 'center',
                  width: 510,
                  height: 60
                }
              ]
            ]
          },
          layout : 'headerLineOnly',
          margin: [50, 20]
        };
      },
      content: [
        {
          table: {
            widths: [70, 175, 70, 70, 70, 50, 29, 29, 29, 29, 29],
            body: [
              [
                {text: 'CODIFICACIÓN', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8, rowSpan: 2},
                {text: 'INDICADOR', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8, rowSpan: 2},
                {text: 'PROCESO, ÁREA O ACTIVIDAD', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8, rowSpan: 2},
                {text: 'CRITERIO DE ACEPTACIÓN', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8, rowSpan: 2},
                {text: 'RESPONSABLE', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8, rowSpan: 2},
                {text: 'RESULTADO', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8, rowSpan: 2},
                {text: 'RESULTADOS PERIODOS ANTERIORES', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8, colSpan: 5},
                {},
                {},
                {},
                {}
              ],
              [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-01', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Cumplimiento al programa de mantenimiento preventivo y predictivo', fontSize: 8},
                {text: 'Mantenimiento', fontSize: 8, alignment: 'center'},
                {text: '100%', fontSize: 8, alignment: 'center'},
                {text: 'Personal de mantenimiento', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-02', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Inspecciones y pruebas de tanques y de circuitos de tubería', fontSize: 8},
                {text: 'Mantenimiento', fontSize: 8, alignment: 'center'},
                {text: '100%', fontSize: 8, alignment: 'center'},
                {text: 'Personal de mantenimiento', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-03', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Atención a las observaciones de verificaciones de la NOM-005-ASEA-2016, análisis de riesgos y otras', fontSize: 8},
                {text: 'Seguridad, Operación y Mantenimiento', fontSize: 8, alignment: 'center'},
                {text: '100%', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-04', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Índice de frecuencia', fontSize: 8},
                {text: 'Seguridad', fontSize: 8, alignment: 'center'},
                {text: '0', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-05', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Índice de gravedad', fontSize: 8},
                {text: 'Seguridad', fontSize: 8, alignment: 'center'},
                {text: '0', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-06', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Implementación del SASISOPA', fontSize: 8},
                {text: 'Seguridad, Operación y Mantenimiento', fontSize: 8, alignment: 'center'},
                {text: '50%', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-07', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Cumplimiento a requisitos legales', fontSize: 8},
                {text: 'Seguridad, Operación y Mantenimiento', fontSize: 8, alignment: 'center'},
                {text: '100%', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-08', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Reducción en la generación de residuos peligrosos', fontSize: 8},
                {text: 'Protección ambiental', fontSize: 8, alignment: 'center'},
                {text: '5%', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-09', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Reducción en el consumo de agua', fontSize: 8},
                {text: 'Protección ambiental', fontSize: 8, alignment: 'center'},
                {text: '5%', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-010', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Reducción en el consumo de energía eléctrica', fontSize: 8},
                {text: 'Protección ambiental', fontSize: 8, alignment: 'center'},
                {text: '5%', fontSize: 8, alignment: 'center'},
                {text: 'Representante Técnico', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
                {},
              ],
            ]
          }
        },
        {text: '\n\n'},
        {
          table: {
            widths: [241, 241, 241],
            body: [
              [
                {
                  text: '',
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                },
                {
                  image: `${firmaEstacion}`,
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                },
                {
                  text: '',
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                }
              ],
              [
                {
                  text: `REVISADO POR:\n ${ddd.representanteTecnico} \n REPRESENTANTE TÉCNICO`,
                  alignment: 'center',
                  border: [true, false, true, true],
                  fontSize: 9
                },
                {
                  text: `APROBADO POR:\n${ddd.maximaAutoridad}\nMAXIMA AUTORIDAD`,
                  alignment: 'center',
                  border: [true, false, true, true],
                  fontSize: 9
                },
                {
                  text: `FECHA DE APROBACIÓN:\n${day}/${month}/${year}`,
                  alignment: 'center',
                  border: [true, false, true, true],
                  fontSize: 9
                }
              ]
            ]
          },
        }
      ],
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
      pageMargins: [22, 120]
    };
    this.pdfMaker.generate(dd, 'Resultado del Monitoreo');
  }

  pdf3() {
    const fecha = new Date();
    const day = fecha.getDate();
    const month = fecha.getUTCMonth() + 1;
    const year = fecha.getFullYear();
    const marcaAgua = this.marcaAguaEstacion;
    const iconoEstacion = this.iconoEstacion;
    const firmaEstacion = this.firmaEstacion;
    const footer = this.myImage;
    const ddd = this.datosEstacion;
    const dd = {
      userPassword: '123',
      ownerPassword: '123456',
      permissions: {
        printing: 'highResolution', // 'lowResolution'
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true
      },
      background() {
        return {
          image: `${marcaAgua}`, width: 290, height: 400,
          absolutePosition: {x: 250, y: 120}, opacity: 0.4
        };
      },
      header: () => {
        return {
          table: {
            widths: [150, 570],
            heights: [30, 10, 10],
            body: [
              [
                {
                  image: `${iconoEstacion}`,
                  width: 45,
                  height: 60,
                  alignment: 'center',
                  border: [true, true, false, true],
                },
                {
                  text: `${ddd.nombreEstacionServicio}`, bold: true, fontSize: 25, alignment: 'center', margin: [15, 20],
                  border: [false, true, true, true],
                }
              ],
              [
                {
                  text: 'XIV. PREPARACIÓN Y RESPUESTA A EMERGENCIAS',
                  alignment: 'center',
                  bold: true,
                  colSpan: 2
                },
                {}
              ],
              [
                {
                  text: 'PLAN DE ATENCIÓN A HALLAZGOS DERIVADOS DEL MONITOREO DEL S A',
                  alignment: 'center',
                  bold: true,
                  fillColor: '#ddd',
                  colSpan: 2
                },
                {}
              ],
            ]
          },
          margin: [22, 15],
        };
      },
      footer(currentPage, pageCount) {
        return {
          table: {
            headerRows: 1,
            widths: [650],
            body : [
              [
                {
                  columns: [
                    'Página' + currentPage.toString() + ' de ' + pageCount,
                    {text: `FS-09 Rev. 0,  ${day}/${month}/${year}`, width: 180}
                  ]
                }
              ],
              [
                {
                  image: `${footer}`,
                  pageBreak: 'after',
                  alignment: 'center',
                  width: 510,
                  height: 60,
                }
              ]
            ]
          },
          layout : 'headerLineOnly',
          margin: [50, 20]
        };
      },
      content: [
        {
          table: {
            widths: [70, 150, 70, 107, 55, 100, 40, 85],
            body: [
              [
                {text: 'CODIFICACIÓN', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},
                {text: 'INDICADOR', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},
                {text: 'PROCESO, ÁREA O ACTIVIDAD', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},
                {text: 'HALLAZGO', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},
                {text: 'FECHA COMPROMISO', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},
                {text: 'ACCIONES PREVENTIVAS/CORRECTIVAS', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},
                {text: 'FECHA CIERRE', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},
                {text: 'EVIDENCIA', bold: true, alignment: 'center', fillColor: '#ddd', fontSize: 8},

              ],
              [
                {text: 'I-SASISOPA-01', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Cumplimiento al programa de mantenimiento preventivo y predictivo', fontSize: 8},
                {text: 'Mantenimiento', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-02', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Inspecciones y pruebas de tanques y de circuitos de tubería', fontSize: 8},
                {text: 'Mantenimiento', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},

              ],
              [
                {text: 'I-SASISOPA-03', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Atención a las observaciones de verificaciones de la NOM-005-ASEA-2016, análisis de riesgos y otras', fontSize: 8},
                {text: 'Seguridad, Operación y Mantenimiento', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-04', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Índice de frecuencia', fontSize: 8},
                {text: 'Seguridad', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-05', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Índice de gravedad', fontSize: 8},
                {text: 'Seguridad', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},

              ],
              [
                {text: 'I-SASISOPA-06', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Implementación del SASISOPA', fontSize: 8},
                {text: 'Seguridad, Operación y Mantenimiento', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-07', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Cumplimiento a requisitos legales', fontSize: 8},
                {text: 'Seguridad, Operación y Mantenimiento', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-08', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Reducción en la generación de residuos peligrosos', fontSize: 8},
                {text: 'Protección ambiental', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-09', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Reducción en el consumo de agua', fontSize: 8},
                {text: 'Protección ambiental', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                {text: 'I-SASISOPA-010', bold: true, alignment: 'center', fontSize: 8},
                {text: 'Reducción en el consumo de energía eléctrica', fontSize: 8},
                {text: 'Protección ambiental', fontSize: 8, alignment: 'center'},
                {},
                {},
                {},
                {},
                {},
              ],
            ]
          }
        },
        {text: '\n\n'},
        {
          table: {
            widths: [241, 241, 241],
            body: [
              [
                {
                  text: '',
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                },
                {
                  image: `${firmaEstacion}`,
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                },
                {
                  text: '',
                  fit: [100, 50],
                  alignment: 'center',
                  border: [true, true, true, false],
                  pageBreak: 'before'
                }
              ],
              [
                {
                  text: `REVISADO POR:\n ${ddd.representanteTecnico} \n REPRESENTANTE TÉCNICO`,
                  alignment: 'center',
                  border: [true, false, true, true]
                },
                {
                  text: `APROBADO POR:\n${ddd.maximaAutoridad}\nMAXIMA AUTORIDAD`,
                  alignment: 'center',
                  border: [true, false, true, true]
                },
                {
                  text: `FECHA DE APROBACIÓN:\n${day}/${month}/${year}`,
                  alignment: 'center',
                  border: [true, false, true, true]
                }
              ]
            ]
          },
        }
      ],
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
      pageMargins: [22, 120]
    };
    this.pdfMaker.generate(dd, 'Plan de Hallazgos');
  }
}
