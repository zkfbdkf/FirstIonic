import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParkData } from '../../app/providers/park-data';

// import {ParkDetailsPage} from '../park-details/park-details';
/*
  Generated class for the ParkList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: Array<Object> = []
  searchQuer: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public parkData: ParkData) {
    parkData.getParks().then(theResult => {
      this.parks = theResult;
    })
  }

  goParkDetails(theParkData) {
    this.navCtrl.push("ParkDetailsPage", { parkData: theParkData });
    // console.log(theParkData);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }
  getParks(event) {
    //Reset items back to all of the items
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;
    })
    //set queryString to the value of the searchbar
    let queryString = event.target.value;
    if (queryString !== undefined) {
      // if the value is an empty string don't filter the items
      if (queryString.trim() == '') { return; }

      this.parkData.getFilteredParks(queryString).then
        (theResult => {
          this.parks = theResult;
        })
    }
  }
  resetList(event) {
    //Reset items back to all of the items
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;
    })
  }
  customHeaderFn(record, recordIndex, records) {
    if (recordIndex > 0) {
      if (record.name.charAt(0)!==records[recordIndex-1].name.charAt(0)) {
        return record.name.charAt(0);
      } else {
        return null;
      }
    } else {
      return record.name.charAt(0);
    }
  }


}
