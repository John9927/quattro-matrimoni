import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  id: any;
  title: any;

  constructor(private firestore: AngularFirestore) { }


  getData() {
    return this.firestore.collection('locali').get();
  }
}
