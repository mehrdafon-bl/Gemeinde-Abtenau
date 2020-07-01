import {Component, OnInit, Renderer2} from '@angular/core';
import {ApiService} from '../api.service';
import {SqliteService} from '../sqlite.service';

@Component({
    selector: 'app-imprint',
    templateUrl: './imprint.page.html',
    styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {

    imprintDataProtection: any = [];

    constructor(
        private api: ApiService,
        private sqLite: SqliteService,
        public renderer: Renderer2) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getApiData();
    }

    getApiData(isRefresher = false) {
        this.sqLite.initDb();

        const api = this.api.get('/imprint-data-protection');
        api.subscribe(
            next => {
                this.imprintDataProtection = next.data.imprintDataProtection;

                let allLinks = document.querySelectorAll('a');
                let intervalForDom: any;

                if (allLinks.length === 0) {
                    intervalForDom = setInterval(() => {
                        allLinks = document.querySelectorAll('a');

                        if (allLinks.length > 0) {
                            this.hrefFunctions();

                            clearInterval(intervalForDom);
                        }
                    }, 500);
                }

                this.sqLite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['imprint-data-protection'])
                    .then((data) => {
                        if (data.rows.length > 1 || data.rows.length < 1) {
                            this.sqLite.db.executeSql('DELETE FROM api_content WHERE api_path = ?', ['imprint-data-protection'])
                                .then(() => {
                                    this.sqLite.db.executeSql(
                                        'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                                        ['imprint-data-protection', JSON.stringify(this.imprintDataProtection)])
                                        .then(() => {
                                        })
                                        .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                                })
                                .catch((ed) => console.log('#delete dberror: ' + JSON.stringify(ed)));
                        } else {
                            this.sqLite.db.executeSql(
                                'UPDATE api_content SET api_data = ? WHERE api_path = ?',
                                [JSON.stringify(this.imprintDataProtection), 'imprint-data-protection'])
                                .then(() => {
                                })
                                .catch((eu) => console.log('#update dberror: ' + JSON.stringify(eu)));
                        }
                    })
                    .catch((es) => {
                        console.log('#select dberror: ' + JSON.stringify(es));

                        this.sqLite.db.executeSql(
                            'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                            ['imprint-data-protection', JSON.stringify(this.imprintDataProtection)])
                            .then(() => {
                            })
                            .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                    });
            },
            error => {
                console.log(error);

                this.sqLite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['imprint-data-protection'])
                    .then((data) => {
                        for (let i = 0; i < data.rows.length; i++) {
                            this.imprintDataProtection = JSON.parse(data.rows.item(i).api_data);
                        }
                    })
                    .catch((es) => console.log('#select error: ' + JSON.stringify(es)));
            }
        );
    }

    hrefFunctions() {
        const allLinks = document.querySelectorAll('a');

        for (let i = 0; i < allLinks.length; i++) {
            let el: any;
            this.renderer.listen(allLinks.item(i), 'click', (event) => {
                el = event.target;

                if (typeof el.href === 'undefined') {
                    event.path.forEach((val, key) => {
                        if (typeof val.href !== 'undefined') {
                            el = val;
                        }
                    });
                }

                if (el.href.indexOf('mailto:') === -1 && el.href.indexOf('tel:') === -1) {
                    this.api.openUrl(el.href);

                    return false;
                }
            });

        }
    }

}
