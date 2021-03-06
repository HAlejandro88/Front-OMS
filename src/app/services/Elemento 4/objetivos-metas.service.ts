import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjetivosMetasService {

  constructor( private httpClient: HttpClient) { }

  createMetaObjetivo(objeto) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.httpClient.post('http://localhost:3000/objetivosMetas/create', objeto, {headers});
  }

  getObjetivo() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.httpClient.get('http://localhost:3000/objetivosMetas', {headers});
  }
}
