import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { AddEventComponent } from './add-event/add-event.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AddGroupComponent } from './add-group/add-group.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { ListEventsComponent } from './list-events/list-events.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatListModule} from '@angular/material/list';
import { FilterPipe} from './shared/filter.pipe';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    AddGroupComponent,
    ListEventsComponent,
    FilterPipe,
    ListGroupsComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgxEditorModule,
    HttpClientModule,
    NgxPaginationModule,
    MatListModule,
    AppRoutingModule,
    RouterModule,
    MatMenuModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent,]
})

export class AppModule { }
