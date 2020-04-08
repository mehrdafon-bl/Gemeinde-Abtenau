import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NavigationExtras, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-events',
    templateUrl: './events.page.html',
    styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
    eventItems: any = [];
    yearValues: any = [];
    eventItemsRaw: any = [];
    firstLoad = true;
    isSearching = false;
    datePickerValue: any;

    constructor(private api: ApiService, private router: Router, public datepipe: DatePipe) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        if (this.firstLoad === true) {
            this.getApiData();
        }

        this.firstLoad = false;
    }

    getApiData(isRefresher = false) {
        const api = this.api.get('/events', true);
        api.subscribe(
            next => {
                this.eventItems = next.data.events;
                this.yearValues = next.data.years;

                this.eventItemsRaw = this.eventItems;
            },
            error => {
                console.log(error);
            }
        );
    }

    searchItems(ev: any) {
        const q = ev.target.value;
        this.eventItems = this.eventItemsRaw;

        if (q && q.trim() !== '') {
            this.isSearching = true;

            this.eventItems = this.eventItems.filter((item) => {
                if (q && q.trim() !== '') {
                    for (const event of item.data) {
                        if (event[0] && event[0].toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            return true;
                        } else if (event[3] && event[3].toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            return true;
                        } else if (event[6] && event[6].toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            return true;
                        } else if (event[7] && event[7].toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            return true;
                        } else if (event[8] && event[8].toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            return true;
                        }
                    }
                }
            });
        } else {
            this.eventItems = this.eventItemsRaw;
            this.isSearching = false;
        }
    }

    datePicker(ev: any) {
        this.datePickerValue = ev.target.value;
        const dateFromDp = this.datepipe.transform(ev.target.value, 'yyyy-MM-ddT00:00:00');
        const q = dateFromDp;
        this.eventItems = this.eventItemsRaw;

        if (q && q.trim() !== '') {
            this.isSearching = true;

            this.eventItems = this.eventItems.filter((item) => {
                if (q && q.trim() !== '') {
                    for (const event of item.data) {
                        if (event[1] && event[1].toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            return true;
                        }
                    }
                }
            });
        } else {
            this.eventItems = this.eventItemsRaw;
            this.isSearching = false;
        }
    }

    resetDatePicker() {
        if (this.isSearching) {
            this.eventItems = this.eventItemsRaw;
            this.isSearching = false;
            this.datePickerValue = null;
        }
    }

    showDetail(data) {
        const dataSend: NavigationExtras = data;
        this.router.navigate(['/events/detail'], dataSend);
    }
}
