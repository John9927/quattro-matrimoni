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
  showHamburger: Boolean = false;

  allData: any;

  filterLocation: Boolean = false;
  filterMenu: Boolean = false;
  filterPrezzo: Boolean = false;
  filterServizio: Boolean = false;

  dataCurrent: any;


  totaleServizio: any;
  totaleMenu: any;
  totalePrezzo: any;
  totaleLocation: any;
  showPoint: Boolean = false;

  dataSelezionata: any;

  lat: any;
  lon: any;

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

  getListScore(title: any, data: any) {
    return this.firestore.collection('dati', ref => ref.where('nome', '==', title).where('data', '==', data)).get();
  }

  addData(dato: any) {
    return this.firestore.collection('dati').add(dato).then(() => {this.modalSuccess = true});
  }

  getDatas(title: any) {
    return this.firestore.collection('dati', ref => ref.orderBy("data", "asc").where('nome', '==', title)).get();
  }

  getDataAndTitle(data: any, title: any) {
    return this.firestore.collection('dati', ref => ref.where('nome', '==', title).where("data", "==", data)).valueChanges();
  }

  getFilterCity(city: any) {
    return this.firestore.collection('locali', ref => ref.where('citta', '==', city)).get();
  }

  getCity() {
    return this.firestore.collection('locali').get();
  }

  getLatLon() {
    return this.firestore.collection('locali').valueChanges();
  }

  getMonthAndYear() {
    return this.firestore.collection('dati', ref => ref.orderBy('mese', 'asc')).get();
  }

  getFilterMonthAndYear(anno: string) {
    return this.firestore.collection('dati', ref => ref.where("anno", "==", anno)).get();
  }

  getDataClassifica(anno: number, mese: string) {
    return this.firestore.collection('dati', ref => ref.where('anno', '==', anno).where('mese', '==' , mese)).get();
  }
}

