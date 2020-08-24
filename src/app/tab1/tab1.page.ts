import { Component, OnInit } from '@angular/core';
import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private platform: Platform,
    private callLog: CallLog
  ) {}

  ngOnInit() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2);
    const fromTime = yesterday.getTime();

    const filters: CallLogObject[] = [
    {
      name: 'type',
      value: '2',
      operator: '=='
    },{
      name: 'date',
      value: fromTime.toString(),
      operator: '>=',
    }];
    this.platform.ready().then(() => {
      this.callLog.hasReadPermission().then(hasPermission => {
        if (!hasPermission) {
          this.callLog.requestReadPermission().then(permissionResults => {
            this.callLog.getCallLog(filters)
              .then(results => {
                const recordsFoundText = JSON.stringify(results);
                console.log(JSON.parse(recordsFoundText))
              })
              .catch(e => alert(' LOG ' + JSON.stringify(e)));
          });
        } else {
          this.callLog.getCallLog(filters)
            .then(results => {
              const recordsFoundText = JSON.stringify(results);
              // console.log(JSON.parse(results))
              console.log(JSON.parse(recordsFoundText))
            })
            .catch(e => alert(' LOG ' + JSON.stringify(e)));
        }
      });
    });
  }

}
