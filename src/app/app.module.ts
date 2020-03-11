import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MeetingMasterComponent } from './meeting-master/meeting-master.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatTabsModule} from '@angular/material/tabs';
import { NamesManagerComponent } from './names-manager/names-manager.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AddMemberCardComponent } from './add-member-card/add-member-card.component';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './secrets';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { SaveButtonComponent } from './save-button/save-button.component';

const routes: Routes = [
  { path: ':id', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MemberCardComponent,
    MeetingMasterComponent,
    CalendarComponent,
    NamesManagerComponent,
    AddMemberCardComponent,
    MainComponent,
    DeleteItemComponent,
    SaveButtonComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
