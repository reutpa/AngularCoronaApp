import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Location } from "./models/location.model";
import { Patient } from "./models/patient.model";

@Injectable()
export class CoronaService{

    constructor(private _http: HttpClient) {
    }

    getAllLocations(): Observable<Location[]> {
        return this._http.get<Location[]>("/api/Location/GetAllLocations");
    }

    GetLocationsPerPatient(id:string): Observable<Location[]> {
        return this._http.get<Location[]>("/api/Location/GetLocationsPerPatient/"+id);
    }

    addLocation(location:Location): Observable<void> {
        return this._http.post<void>("/api/Location/AddLocation",location);
    }

    deleteLocation(id:string): Observable<void> {
        return this._http.delete<void>("/api/Location/DeleteLocation/"+id);
    }

    addPatient(patient:Patient): Observable<void> {
        return this._http.post<void>("/api/Patient/AddPatient",patient);
    }
}