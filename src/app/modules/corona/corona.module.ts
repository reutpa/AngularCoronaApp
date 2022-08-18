import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { Route, RouterModule } from '@angular/router';
import { MainMenuComponent } from './corona-menu/corona-menu.component';
import { PatientReportComponent } from 'src/app/modules/corona/patient-report/patient-report.component';
import { EpidemiologyReportComponent } from 'src/app/modules/corona/epidemiology-report/epidemiology-report.component';
import { CoronaService } from './corona.service';


const APP_ROUTES: Route[] = [
  { path: "empdimiologyReport", component: EpidemiologyReportComponent },
  { path: "patientReport", component: PatientReportComponent },
];

@NgModule({
  declarations: [PatientReportComponent, EpidemiologyReportComponent,MainMenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    RouterModule.forChild(APP_ROUTES)
  ],
  providers: [CoronaService],
  exports: [MatInputModule,MainMenuComponent]
})
export class CoronaModule { }