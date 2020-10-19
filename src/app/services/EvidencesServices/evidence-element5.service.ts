import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvidenceElement5Service {

  constructor(
    private http: HttpClient
  ) { }

  getPhoto(){
    return this.http.get('http://localhost:3000/evidencePhotoElement5/');
  }

  uploadImage(title: string, description: string, photo: File){
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('myfile', photo);
    return this.http.post('http://localhost:3000/evidencePhotoElement5/create', fd);
  }

  getDocument(){
    return this.http.get('http://localhost:3000/evidenceDocumentElement5/');
  }

  uploadDocument( title: string, description:string, document:File){
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('myfile', document);
    return this.http.post('http://localhost:3000/evidenceDocumentElement5/create', fd);
  }
}
