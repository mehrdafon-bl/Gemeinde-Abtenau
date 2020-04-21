import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {NavigationExtras, Router} from '@angular/router';
import {SqliteService} from '../sqlite.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    newsItems: any = [];
    refresherEvent: any = [];
    firstLoad = true;

    constructor(
        private api: ApiService,
        private router: Router,
        private sqlite: SqliteService) {
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
        const api = this.api.get('/news', isRefresher ? false : true);
        api.subscribe(
            next => {
                this.newsItems = next.data.news;

                if (this.newsItems.length > 0) {
                    this.sqlite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['news'])
                        .then((data) => {
                            if (data.rows.length > 1 || data.rows.length < 1) {
                                this.sqlite.db.executeSql('DELETE FROM api_content WHERE api_path = ?', ['news'])
                                    .then(() => {
                                        this.sqlite.db.executeSql(
                                            'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                                            ['news', JSON.stringify(this.newsItems)])
                                            .then(() => {
                                            })
                                            .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                                    })
                                    .catch((ed) => console.log('#delete dberror: ' + JSON.stringify(ed)));
                            } else {
                                this.sqlite.db.executeSql(
                                    'UPDATE api_content SET api_data = ? WHERE api_path = ?',
                                    [JSON.stringify(this.newsItems), 'news'])
                                    .then(() => {
                                    })
                                    .catch((eu) => console.log('#update dberror: ' + JSON.stringify(eu)));
                            }
                        })
                        .catch((es) => {
                            console.log('#select dberror: ' + JSON.stringify(es));

                            this.sqlite.db.executeSql(
                                'INSERT INTO api_content (api_path, api_data) VALUES(?,?)',
                                ['news', JSON.stringify(this.newsItems)])
                                .then(() => {
                                })
                                .catch((ei) => console.log('#insert dberror: ' + JSON.stringify(ei)));
                        });
                } else {
                    this.getDataFromDb();
                }

                if (isRefresher) {
                    this.refresherEvent.target.complete();
                }
            },
            error => {
                console.log(error);

                if (isRefresher) {
                    this.refresherEvent.target.complete();
                }

                this.getDataFromDb();
            }
        );

        setTimeout(() => {
            if (this.newsItems.length === 0) {
                this.getDataFromDb();
            }
        }, 4000);
    }

    showDetail(data) {
        const dataSend: NavigationExtras = data;
        this.router.navigate(['/news/detail'], dataSend);
    }

    doRefresh(event) {
        this.refresherEvent = event;
        this.getApiData(true);
    }

    getDataFromDb() {
        this.sqlite.db.executeSql('SELECT * FROM api_content WHERE api_path = ?', ['news'])
            .then((data) => {
                for (let i = 0; i < data.rows.length; i++) {
                    this.newsItems = JSON.parse(data.rows.item(i).api_data);
                }
            })
            .catch((es) => console.log('#select error: ' + JSON.stringify(es)));
    }
}
