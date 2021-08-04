import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  id: any;
  title: any;
  location: any = [];
  menu: any = [];
  prezzo: any = [];
  servizio: any = [];
  modalSuccess: Boolean = false;
  response: any;

  allData: any;

  filterLocation: Boolean = false;
  filterMenu: Boolean = false;
  filterPrezzo: Boolean = false;
  filterServizio: Boolean = false;

  constructor(private firestore: AngularFirestore) { }


  getData() {
    return this.firestore.collection('locali').get();
  }

  getList() {
    return this.firestore.collection('dati').get();
  }

  getListDetail(title: any) {
    return this.firestore.collection('dati', ref => ref.where('nome', '==', title)).valueChanges();
  }

  getListDetailList(title: any) {
    return this.firestore.collection('dati', ref => ref.where('nome', '==', title)).valueChanges();
  }

  getListScore(title: any) {
    return this.firestore.collection('dati', ref => ref.where('nome', '==', title)).get();
  }

  addData(dato: any) {
    return this.firestore.collection('dati').add(dato).then(() => {this.modalSuccess = true});
  }
}
