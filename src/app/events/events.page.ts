import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NavigationExtras, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SqliteService} from '../sqlite.service';

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

    constructor(
        private api: ApiService,
        private router: Router,
        public datepipe: DatePipe,
        private sqLite: SqliteService) {
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
        this.sqLite.initDb();

        const api = this.api.get('/events', true);
        api.subscribe(
            next => {
                this.eventItems = next.data.events;
                this.yearValues = next.data.years;

                this.sqLite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['events'])
                    .then((data) => {
                        if (data.rows.length > 1 || data.rows.length < 1) {
                            this.sqLite.db.executeSql('DELETE FROM api_content WHERE api_path = ?', ['events'])
                                .then(() => {
                                    this.sqLite.db.executeSql(
                                        'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                                        ['events', JSON.stringify(next.data)])
                                        .then(() => {
                                        })
                                        .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                                })
                                .catch((ed) => console.log('#delete dberror: ' + JSON.stringify(ed)));
                        } else {
                            this.sqLite.db.executeSql(
                                'UPDATE api_content SET api_data = ? WHERE api_path = ?',
                                [JSON.stringify(next.data), 'events'])
                                .then(() => {
                                })
                                .catch((eu) => console.log('#update dberror: ' + JSON.stringify(eu)));
                        }
                    })
                    .catch((es) => {
                        console.log('#select dberror: ' + JSON.stringify(es));

                        this.sqLite.db.executeSql(
                            'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                            ['events', JSON.stringify(next.data)])
                            .then(() => {
                            })
                            .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                    });

                this.eventItemsRaw = this.eventItems;
            },
            error => {
                console.log(error);

                this.sqLite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['events'])
                    .then((data) => {
                        for (let i = 0; i < data.rows.length; i++) {
                            const dbData = JSON.parse(data.rows.item(i).api_data);
                            console.log(dbData);
                            this.eventItems = dbData.events;
                            this.yearValues = dbData.years;
                            this.eventItemsRaw = this.eventItems;
                        }
                    })
                    .catch((es) => console.log('#select error: ' + JSON.stringify(es)));
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
