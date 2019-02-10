import { Component, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { FEATURE } from './_store/features';
import { Store } from '@ngrx/store';
import { APP_ACTIONS } from './_store/app-actions';
import { NgrxStoreSubscription } from 'ngrx-helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends NgrxStoreSubscription  implements OnInit, OnChanges  {
  title = 'Movies';
  theme = '';
  navTheme = 'navbar-light bg-light';
  @ViewChild('switch') switch: ElementRef;
  constructor(private store: Store<any>) {
    super(store);
  }

  ngOnInit() {

  }
  ngOnChanges() {

  }
  changeTheme() {
    if(this.switch.nativeElement.checked === true) {
      this.theme = "dark";
      this.navTheme = "navbar-dark bg-dark"
    }
    else {
      this.theme = "light";
      this.navTheme = "navbar-light bg-light"
    }
    this.store.dispatch({
      type: APP_ACTIONS.FETCH_THEME_RESOLVED,
      data: {
          'theme' : this.theme
        }
      
    });

  }
}
