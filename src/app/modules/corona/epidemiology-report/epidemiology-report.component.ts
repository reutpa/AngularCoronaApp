import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CoronaService } from '../corona.service';
import { Location } from '../models/location.model';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-epidemiology-report',
  templateUrl: './epidemiology-report.component.html',
  styleUrls: ['./epidemiology-report.component.scss']
})
export class EpidemiologyReportComponent implements OnInit,OnDestroy {

  constructor(private _coronaService: CoronaService) {  }

  ngOnInit(): void {
    this.subscribtion=this._coronaService.getAllLocations().subscribe(data => {
      this.locationsArr = data;

      const locations = Array.from({ length: this.locationsArr.length }, (_, k) => this.locationsArr[k]);

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(locations);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  subscribtion:Subscription;
  locationsArr: Location[];
  displayedColumns: string[] = ['startDate', 'endDate', 'city', 'adress'];

  dataSource: MatTableDataSource<Location>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}