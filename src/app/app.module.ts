import { ProcedimientoCincoPageModule } from './pages/procedimiento-cinco/procedimiento-cinco.module';
import { AyudaPageModule } from './pages/ayuda/ayuda.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http'
import { EditPoliticaPageModule } from './pages/edit-politica/edit-politica.module';
import { OnbjetivoModalPageModule } from './pages/onbjetivo-modal/onbjetivo-modal.module'



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,AyudaPageModule,
    ProcedimientoCincoPageModule,
    FullCalendarModule,
    EditPoliticaPageModule,
    OnbjetivoModalPageModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
