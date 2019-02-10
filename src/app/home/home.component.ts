import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { APP_REDUCERS } from '../_store/app-reducers';
import { FEATURE } from '../_store/features';
import { Store } from '@ngrx/store';
import { APP_ACTIONS } from '../_store/app-actions';
import { NgrxStoreSubscription } from 'ngrx-helpers';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends NgrxStoreSubscription implements OnInit {
  rowData : any = [];
  dataState: string;
  @ViewChild('test') test: ElementRef;
  theme : any;
  gridTheme = 'ag-theme-blue';
  columnDefs = [
    { headerName: 'Title', field: 'movie_title', sortable: false },
    { headerName: 'Genres', field: 'genres'},
    { headerName: 'Language', field: 'language' },
    { headerName: 'Country', field: 'country'},
    { headerName: 'Budget', field: 'budget' },
    { headerName: 'Title Year', field: 'title_year'},
    { headerName: 'Director', field: 'director_name'}
  ];
  rowHeight = 50;

  constructor(private store: Store<any>) {
    super(store);
  }

  ngOnInit() {
    // Fetching data from the API for movies
    this.store.dispatch({
      type: APP_ACTIONS.FETCH_DATA
    });

    super.getState({
      feature: FEATURE.APP,
      reducer: APP_REDUCERS.APP_DATA,
      state: 'appData'
    }).subscribe((data) => {
      this.dataState = data.state;
      if (data.state == 'RESOLVED') {
        this.rowData = data.data;
      }
    });
    super.getState({
      feature: FEATURE.APP,
      reducer: APP_REDUCERS.APP_DATA,
      state: 'themeData'
    }).subscribe((data) => {
      this.dataState = data.state;
      if (data.state == 'RESOLVED') {
        this.theme = data.data;
        if(this.theme === 'light') {
          this.gridTheme = 'ag-theme-blue';
        }
        else {
          this.gridTheme = 'ag-theme-dark';
        }
      }
    });
  }
}
