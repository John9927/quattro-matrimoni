import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  id: any;
  title: any;

  location: any;
  menu: any;
  prezzo: any;
  servizio: any;

  constructor(private firestore: AngularFirestore) { }


  getData() {
    return this.firestore.collection('locali').get();
  }

  getList() {
    return this.firestore.collection('dati').get();
  }

  addData(dato: any) {
    return this.firestore.collection('dati').add(dato);
  }
}
