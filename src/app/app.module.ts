import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularFireModule } from '@angular/fire';
import { DetailComponent } from './components/detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DetailListComponent } from './components/detail-list/detail-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    HeaderComponent,
    DetailComponent,
    ListComponent,
    SpinnerComponent,
    DetailListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
