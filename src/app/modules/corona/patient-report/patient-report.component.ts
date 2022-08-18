import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoronaService } from '../corona.service';
import { Patient } from '../models/patient.model';
import { Location } from './../models/location.model';

@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.scss']
})
export class PatientReportComponent implements OnInit,OnDestroy {

  constructor(private _coronaService: CoronaService) { }

  ngOnInit(): void {
  }

  locationsArr: Location[];
  newPatient: Patient = new Patient();
  patientId: string;
  subscribtionGetAll:Subscription;
  subscribtionAddPatient:Subscription;
  subscribtionAddLocation:Subscription;
  subscribtionDeleteLocation:Subscription;


  locationForm: FormGroup = new FormGroup({
    "startDate": new FormControl("", Validators.required),
    "endDate": new FormControl("", Validators.required),
    "city": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    "adress": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    "patientId": new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
  })

  getLocationsForPatient() {
    if (this.locationForm.controls['patientId'].valid) {
      this.subscribtionGetAll=this._coronaService.GetLocationsPerPatient(this.locationForm.controls['patientId'].value).subscribe(data => {
        this.locationsArr = data;
      })
    }
  }

  changePatient() {
    if (this.locationForm.controls['patientId'].valid) {
      this.getLocationsForPatient();
      if (this.locationsArr === null) {
        if (confirm("This patient didn't exist in the system!\n You want add him now?")) {
          this.newPatient.name = prompt("Please enter his full name here");
          this.newPatient.age = +prompt("Please enter his age here");
          this.newPatient.id = this.locationForm.controls['patientId'].value;
          this.newPatient.age >= 0 && this.newPatient.age <= 120 && this.newPatient.name !== null ? this.subscribtionAddPatient=this._coronaService.addPatient(this.newPatient).subscribe(() => {
            alert("adding patient successfully!")
          }, err => {
            alert("adding location failed");
          }) : '';
        }
      }
    }
  }

  addLocation() {
    this.patientId = this.locationForm.controls['patientId'].value;
    if (Date.parse(this.locationForm.controls['startDate'].value) <= Date.parse(this.locationForm.controls['endDate'].value) 
       && Date.parse(this.locationForm.controls['endDate'].value) <= Date.now()) {
      this.subscribtionAddLocation=this._coronaService.addLocation(this.locationForm.value).subscribe(() => {
        this.getLocationsForPatient(),
          this.locationForm.reset(),
          this.locationForm.controls['patientId'].setValue(this.patientId)
      }, err => { alert("adding location failed"); }
      );
    }
    else
      alert("the dates is wrong! fix it!");
  }

  deleteLocation(id: string) {
    this.subscribtionDeleteLocation=this._coronaService.deleteLocation(id).subscribe(() => {
      this.getLocationsForPatient(),
        this.locationForm.reset(),
        this.locationForm.controls['patientId'].setValue(this.patientId)
    }, err => { alert("adding location failed"); }
    )
  }

  ngOnDestroy(): void {
    this.subscribtionAddLocation != undefined ? this.subscribtionAddLocation.unsubscribe():'';
    this.subscribtionAddPatient != undefined ? this.subscribtionAddPatient.unsubscribe():'';
    this.subscribtionDeleteLocation != undefined ? this.subscribtionDeleteLocation.unsubscribe():'';
    this.subscribtionGetAll != undefined ? this.subscribtionGetAll.unsubscribe():'';
  }
}
